require('dotenv').config()
const { processUpload } = require("./processUpload");
const { createSchema } = require('graphql-yoga')
const { DateTimeResolver } = require('graphql-scalars')
const { hash, compare } = require('bcryptjs')
const { sign, verify } = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const readingTime = require('reading-time');


const typeDefs =/* GraphQL */ `
type Query {
  getUserByToken:User
  articles (id: Int, authorId: Int, page: Int,per_page:Int): [Article]!
  tags: [Tag]!
  notifications (is_seen:Boolean) :[Notification]!
  comments:[Comment]!
  users (email:String!) : [User]!
  searchUser(userName:String!):[User]!
  searchTag(name:String!):[Tag]!
  searchArticle(title:String!):[Article]!
}
   type Mutation {
     login(email: String!,password:     String!) : AuthPayload!
     signup (     email   :     String! ,
      password:     String! ,
      first_name  : String!,
      last_name  :  String!,
      phone_number: String!,
      username  :   String!,
      image: Upload): User!
    
     createArticle (content: String  , title: String!, summery: String!,image: Upload,tags:[ID]!): Article!
     createTag (name: String!): Tag!
     createComment (article_id: Int!,content:String,last_name:String,first_name:String,email:String!): Comment!

     makeAllNotifAsRead:Count
    }
 
   type Subscription {
    newNotification(token:String!): Notification!
  }
  
type Count {
  count: Int
}

   type Article {
     author: User
     content: String
     created_at: DateTime!
     id: Int!
     title: String!
     summery: String!
     updated_at: DateTime!
     read_time_minutes: String  
     image_url:    String  
     tags: [Tag]
     comments:[Comment]
   }
   
   type Notification {
    title :      String!
    image_url :  String!
    is_seen :    Boolean 
    created_at : DateTime! 
    description : String
    updated_at :  DateTime! 
    user :       User   
   }
   
   type Tag {
    id: Int
     created_at: DateTime
     updated_at: DateTime
     name   :    String!
     articles:[Article]!
   }
   input ArticleTags{
    id: Int
   }

   type AuthPayload {
    token: String
    user: User
  }
 
   type Comment {
     created_at: DateTime 
     updated_at: DateTime
     last_name  :String
     first_name :String
     content :   String
     email  :    String
     article: Article
   }
 
 
 
   enum SortOrder {
     asc
     desc
   }
 
 
 
   type User {
    id: Int
     password:     String
     email   :     String
     created_at :  DateTime
     first_name  : String
     image_url  :  String
     last_name  :  String
     phone_number: String
     updated_at  : DateTime
     username  :   String
     articles: [Article]
     comments:[Comment]
     notifications:[Notification]
     }
 
 
   input UserCreateInput {
     email   :     String! 
     password:     String! 
     first_name  : String!
     last_name  :  String!
     phone_number: String!
     username  :   String!
     image: Upload
   }
 
 
   scalar DateTime
   scalar Upload
 `

const resolvers = {
  Query: {
    searchUser: (_parent, args, context) => {
      return context.prisma.user.findMany({
        where: {
          username: {
            search: args.userName,
          },
        },
        include: {
          articles: true
        },
      })
    },

    searchTag: (_parent, args, context) => {
      return context.prisma.tag.findMany({
        where: {
          name: {
            search: args.name,
          },
        },
        include: {
          articles: { include: { article: true } }
        },
      })
    },

    searchArticle: (_parent, args, context) => {
      return context.prisma.article.findMany({
        where: {
          title: {
            search: args.title
          },
        }
      })
    },

    users: (_parent, args, context) => {
      return context.prisma.user.findMany({
        where: {
          email: args.email,
        }
      })
    },
    tags: (_parent, args, context) => {
      return context.prisma.tag.findMany()
    },
    notifications: (_parent, args, context) => {
      return context.prisma.notification.findMany({
        where: {
          is_seen: args.is_seen,
        }
      })
    },
    getUserByToken: async (_parent, args, context) => {
      const currentUser = await context.currentUser(context.request)
      if (!currentUser) {
        return Promise.reject(
          new GraphQLError(
            `Unauthenticated!'.`
          )
        )
      }
      return currentUser
    },

    articles: async (_parent, { id, authorId, per_page = 5, page = 1 }, context) => {

      const where = {}

      if (id) {
        where.id = id
      }
      if (authorId) {
        where.authorId = authorId
      }

      const articles = await context.prisma.article.findMany({

        where,
        skip: (page - 1) * per_page,
        take: per_page,
        include: {
          author: true,
          comments: true,
          tags: { include: { tag: true } }
        },
      })



      const result = articles.map((post) => {
        return { ...post, tags: post.tags.map((tag) => tag.tag) }
      })
      return result
    },

  },
  Mutation: {

    createTag: async (_parent, args, context) => {
      const currentUser = await context.currentUser(context.request)
      if (!currentUser) {
        return Promise.reject(
          new GraphQLError(
            `Unauthenticated!'.`
          )
        )
      }
      return context.prisma.tag.create({
        data: {
          name: args.name
        },
      })
    },
    makeAllNotifAsRead: (_parent, args, context) => {
      return context.prisma.notification.updateMany({
        where: {
          is_seen: false,
        },
        data: {
          is_seen: true,
        },
      })
    },
    createComment: async (_parent, args, context) => {
      return context.prisma.comment.create({
        data: {
          content: args.content,
          last_name: args.last_name,
          first_name: args.first_name,
          email: args.email,
          article: { connect: { id: args.article_id } },
        },
      })
    },


    createArticle: async (_parent, args, context) => {
      const currentUser = await context.currentUser(context.request)
      if (!currentUser) {
        return Promise.reject(
          new GraphQLError(
            `Unauthenticated!'.`
          )
        )
      }
      const id = args.image != 'undefined' && args.image ? await processUpload(args.image) : 'article.jpg';
      const image_url = `http://${process.env.FILE_SERVER_URL}:${process.env.FILE_SERVER_PORT}/${id}`

      const readingTimeStats = readingTime(args.content).minutes;

      const tags = args.tags[0]?args.tags[0].split(","):[]

      const articleTags = await tags.reduce((accumulator, currentValue) => {
        return [...accumulator, {
          tag: {
            connect: {
              id: +currentValue,
            },
          },
        }]
      }, [])
      const newArticle = await context.prisma.article.create({
        data: {

          content: args.content,
          title: args.title,
          summery: args.summery,
          read_time_minutes: `${readingTimeStats}`,
          author: { connect: { id: currentUser.id } },
          image_url: image_url,
          tags: { create: articleTags },
        },
      })
      context.makeNonification({ title: `مقاله ${args.title} با موفقیت افزوده شد`, description: args.summery, image_url, user_id: currentUser.id })
      return newArticle
    },


    signup: async (_parent, args, context) => {
      const id = args.image ? await processUpload(args.image) : null;
      const image_url = `http://${process.env.FILE_SERVER_URL}:${process.env.FILE_SERVER_PORT}/${id}`
      return context.prisma.user.create({
        data: {
          email: args.email,
          password: await hash(args.password, 10),
          first_name: args.first_name,
          image_url: image_url,
          last_name: args.last_name,
          phone_number: args.phone_number,
          username: args.username
        },
      })
    },


    login: async (_parent, args, context) => {

      const user = await context.prisma.user.findUnique({
        where: { email: args.email }
      })


      if (!user) {
        return Promise.reject(
          new GraphQLError(
            `No such user found'.`
          )
        )

      }

      // 2
      const valid = await compare(args.password, user.password)
      if (!valid) {

        return Promise.reject(
          new GraphQLError(
            `Invalid password'.`
          )
        )

      }

      const token = sign({ userId: user.id }, process.env.SECRET_KEY)

      // 3
      return { token, user }

    },


  },
  Subscription: {
    newNotification: {
      subscribe: async (_, args, context) => {
        const tokenPayload = verify(args.token, process.env.SECRET_KEY)
        const userId = tokenPayload.userId
        if (!userId) {
          return Promise.reject(
            new GraphQLError(
              `Unauthenticated!'.`
            )
          )
        }
        return context.pubSub.subscribe("newNotification", userId)
      },
      resolve: (payload) => payload,
    },
  },
  DateTime: DateTimeResolver,
}

const schema = createSchema({
  typeDefs,
  resolvers,
})
module.exports = {
  schema
}
