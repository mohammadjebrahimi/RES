const { PrismaClient } = require('@prisma/client')
const  authenticateUser  = require('./auth')
const  makeNonification  = require('./notification')
const { createPubSub } = require('graphql-yoga')

 
const pubSub = createPubSub()
const prisma = new PrismaClient()

const context = {
  prisma,
  pubSub,
  currentUser:  authenticateUser(prisma),
  makeNonification:makeNonification({prisma,pubSub})
}

module.exports = {
  context,
}
