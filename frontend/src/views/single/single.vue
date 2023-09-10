<template>
    <main class="single">
        <default-header class="single__header"/>
        <default-article :="articleDetail" />
        <horizontal-card-container class="single__horizontal-card-containe" label="از همین نویسنده" :cards="cards">
        </horizontal-card-container>
        <DefaultCommentContainer class="single__comments" label="نظرات" :comments="comments" />
        <DefaultCommentForm @submitComment="submitComment($event)" label="نظر دادن" :articleId=+$route.params.id />
        <EmptyModal v-model:show="showLoader">
            <Circle size="80px" />
        </EmptyModal>
    </main>
    <default-footer />
</template>
<script>
import defaultHeader from '@/components/headers/default-header.vue'
import defaultArticle from '@/components/articles/default-article.vue'
import defaultFooter from '@/components/footers/default-footer.vue'
import HorizontalCardContainer from '@/components/card-containers/horizontal-card-container.vue'
import DefaultCommentContainer from '@/components/comment-containers/default-comment-container.vue'
import DefaultCommentForm from '@/components/comment-form/default-comment-form.vue'
import EmptyModal from '../../components/modals/empty-modal.vue'
import Circle from '../../components/loading/circle.vue'
import { useToast } from "vue-toastification";
import getPersianDate from "@/mixins/date.js"
export default {
    name: "single-page",
    components: {
        defaultArticle,
        defaultHeader,
        defaultFooter,
        HorizontalCardContainer,
        DefaultCommentContainer,
        DefaultCommentForm,
        EmptyModal,
        Circle
    },
    data() {
        return {
            toast: useToast(),
            showLoader: false,
            articleDetail: {},
            cards: [],
            comments: []

        }
    },
    methods: {
        async handelArticleAPI(token, id) {
            this.showLoader = true
            let resp = await fetch(`http://localhost:4000`, {
                method: 'POSt', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    query: `query($id:Int){
  articles(id:$id){
    created_at,id,image_url,author{
        username
        image_url
    },tags {
        name
        id
    },read_time_minutes,content,title,  comments {
      content
      last_name
      first_name
      created_at
    } 
  }
}`,
                    variables: {
                        id: +id
                    }
                }),
            })
            let respData = await resp.json()
            if (resp.status < 300) {
                this.showLoader = false
                if (respData.errors) {
                    this.toast.error(respData.errors[0].message)
                }
                else if (respData.data.articles.length > 0) {
                    // this.toast.success('مقالات لود شدند')
                } else {
                    this.toast.error('موردی برای نمایش نیست')
                }
                return respData.data.articles[0]
            } else {
                this.toast.error('خطای پیش بینی نشده')
            }

        },
        async handelOtherArticleOfThisAuthorAPI(authorId) {
            this.showLoader = true
            let resp = await fetch(`http://localhost:4000`, {
                method: 'POSt', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    query: `query($authorId:Int){
  articles(authorId:$authorId){
    created_at,id,image_url,author{
        username
        image_url
    },tags {
        name
        id
    },read_time_minutes,content,summery,title,  comments {
      content
      last_name
      first_name
      created_at
    } 
  }
}`,
                    variables: {
                        authorId: +authorId
                    }
                }),
            })
            let respData = await resp.json()
            if (resp.status < 300) {
                this.showLoader = false
                if (respData.errors) {
                    this.toast.error(respData.errors[0].message)
                }
                return respData.data.articles
            } else {
                this.toast.error('خطای پیش بینی نشده')
            }

        },
        async handelAddCommentsAPI(token, body) {
    
            this.showLoader = true
            let resp = await fetch(`http://localhost:4000`, {
                method: 'POSt', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    query: `mutation($article_id: Int!,$content:String,$last_name:String,$first_name:String,$email:String!){
                   
                   createComment(article_id:$article_id,first_name:$first_name,last_name:$last_name,content:$content,email:$email){
                     __typename
                   }
                 
                 }`,
                    variables: {
                        content: body.content,
                        last_name: body.last_name,
                        first_name: body.first_name,
                        email: body.email,
                        article_id: body.article_id
                    }
                }),
            })
            let comments = await resp.json()
            this.showLoader = false
            if (resp.status < 300) {
                this.toast.success('نظر شما ارسال شد')
                return comments
            } else {
                if (Array.isArray(comments.message)) {
                    comments.message.forEach(message => this.toast.error(message))
                } else {
                    this.toast.error(comments.message)
                }
                return false
            }


        },
        async submitComment(e) {

            let comment = await this.handelAddCommentsAPI(localStorage.getItem("accessToken"), e)
            if (comment) {
                await this.pageLoader()
            }
        },
        async pageLoader() {
            let article = await this.handelArticleAPI(localStorage.getItem("accessToken"), this.$route.params.id)
            let articleData = article
            this.articleDetail = {
                'title': articleData.title,
                'studyDuration': `${articleData.read_time_minutes} دقیقه مطالعه`,
                'tags': articleData.tags,
                'image_url': articleData.image_url.replace('192.168.53.150', '87.107.30.143'),
                'content': articleData.content,
                date: getPersianDate(articleData.created_at),
                authFigure: articleData.author.image_url.replace('192.168.53.150', '87.107.30.143'),
                authorName: `${articleData.author.username}`,
            }
            const articleOfThisAuthor = await this.handelOtherArticleOfThisAuthorAPI(articleData.author.id)
            this.cards = articleOfThisAuthor.map((current) => {
                return {
                    "authFigure": articleData.author.image_url.replace('192.168.53.150', '87.107.30.143'),
                    "authorName": `${articleData.author.username} ${articleData.author_last_name}`,
                    "date": getPersianDate(current.created_at),
                    "title": current.title,
                    "summery": current.summery,
                    "studyDuration": `${current.read_time_minutes} دقیقه مطالعه`,
                    "tags": current.tags,
                    "image": current.image_url.replace('192.168.53.150', '87.107.30.143'),
                    "link": { name: 'single', params: { id: current.id } }
                }
            })
            this.comments = articleData.comments.map((current) => {
                return {
                    authorName: `${current.first_name} ${current.last_name}`,
                    date: getPersianDate(current.created_at),
                    comment: current.content
                }
            })

        }

    },
    async created() {
        await this.pageLoader()
    },
}
</script>
<style lang="scss" scoped>
.single {
    @include flex-direction(column);
    justify-content: center;
    align-items: center;
    margin-top: 97px;
    padding: 0 1em;

    &__header {
        position: fixed;
        top: 0px;
        @include z-index-group(2);
    }

    &__horizontal-card-container {
        margin: 4rem auto 0;
    }

    &__comments {
        margin: 8rem auto 0;
    }
}
</style>