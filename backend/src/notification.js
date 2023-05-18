const makeNonification = (content) => {
    //args:{ title, descriptin, image_url, user_id }
    return async (args) => {
        const newNotification = await content.prisma.notification.create({
            data: {
                description: args.description,
                title: args.title,
                user: { connect: { id: args.user_id } },
                image_url: args.image_url,
            },
        })
        content.pubSub.publish("newNotification", args.user_id, newNotification);

        return newNotification
    }

}
module.exports = makeNonification 
