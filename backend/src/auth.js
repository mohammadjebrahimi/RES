require('dotenv').config()
const { verify } = require('jsonwebtoken')
const authenticateUser =   (prisma) => {
    return async (request) => {
        const header = request.headers.get('authorization')
        if (header !== null) {

            const tokenPayload = verify(header, process.env.SECRET_KEY)
            const userId = tokenPayload.userId
            return await prisma.user.findUnique({ where: { id: userId } })
        }

        return null
    }

}
module.exports = authenticateUser 
