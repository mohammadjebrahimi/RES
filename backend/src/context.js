const { PrismaClient } = require('@prisma/client')
const  authenticateUser  = require('./auth')

const prisma = new PrismaClient()

const context = {
  prisma: prisma,
  currentUser:  authenticateUser(prisma)
}

module.exports = {
  context,
}
