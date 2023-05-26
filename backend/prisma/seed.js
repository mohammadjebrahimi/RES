const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const userData = [
    {
        first_name: 'guest',
        last_name: 'guest',
        username: 'guest',
        password: '$2a$10$XtAewELfDjqHzPT5J8I6y.UpglkNDBgdNfri2oVu/XUXY/xpu71NG', //guest1
        image_url: 'http://127.0.0.1:5000/unnamed.png',
        email: 'guest@guest.com',
        phone_number: '09151234567',
        articles: {
            create: [
                {
                    title: 'Advances in rocking core-moment frame analysis',
                    content: `Seismic loading is a function of building mass and stiffness. The conventional triangular
                    distribution suggested by most codes of practice, e.g. ASCE/SEI 7-10, may or may not
                    correspond to the physical realities of a given structure. An approximate or nonconforming
                    seismic distribution can result in unrealistic overturning moments, carrying capacity,
                    elasto-plastic deformations and sequences of formations of plastic hinges. One of the most
                    basic attributes of RRC is that they generate seismic load profiles that are similar to the
                    triangular load distribution. In the proposed structural system, the RRC forces the RCMF to
                    adapt a linear deformation profile and a similar normalized displacement function. While
                    the rigid body rotation of the system changes with monotonic changes in the applied
                    loading, its deformed shape remains the same. The deformed profile is not sensitive to
                    changes in the global stiffness of the MF and its appendages. In fact, the seismic load
                    distribution is a byproduct of the proposed configuration. Furthermore the first natural
                    mode is similar in shape to the displacement profile and suppresses all higher modes of
                    vibrations.`,
                    read_time_minutes: '0.005',
                    summery:`Seismic loading is a function of building mass and stiffness. The conventional triangular
                    distribution suggested by most codes of practice, e.g. ASCE/SEI 7-10, may or may not
                    correspond to the physical realities of a given structure. `,
                    image_url: 'http://127.0.0.1:5000/0jGnggeQA.png',
                    tags: {
                        create: {
                            tag: {
                                create: {
                                    name: 'rocking core',
                                },
                            },
                        }
                    }
                },

                {
                    title: 'Numerical Assessment of Time-Dependent Deformation of a Road Tunnel—a Case Study',
                    content: `Numerical analysis is performed to analyze the creep behaviour in the tunnel subjected to anisotropic stress condition. This study highlights the necessity of considering time-dependent phenomena in the selection of support systems. A case-study of Atal Tunnel,India is considered for the same.`,
                    read_time_minutes: '0.005',
                    summery:`Seismic loading is a function of building mass and stiffness. The conventional triangular
                    distribution suggested by most codes of practice, e.g. ASCE/SEI 7-10, may or may not
                    correspond to the physical realities of a given structure. `,
                    image_url: 'http://127.0.0.1:5000/Numerical-model-of-tunnel_W640.jpg',
                    tags: {
                        create: {
                            tag: {
                                create: {
                                    name: 'guest',
                                },
                            },
                        }
                    }
                },


            ],
        },
    },


]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        })
        console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })