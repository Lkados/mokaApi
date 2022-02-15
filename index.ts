import { PrismaClient } from '@prisma/client'

const bcrypt = require('bcrypt');
const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@prisma.io',
        password: bcrypt.hashSync('motdepasse', 10),
        articles: {
          create: { title: 'Hello World', 
                    subHead: 'welcome', 
                    contents: 'beautyfull day',
                    text: 'today', 
                    image:'i',
                    background: 'b', 
                    comments: 'fingers crossed', 
                    map: 'm' },
        },
        roles: {
          create: { admin: true },
        },
        social_media: ''
      },
    })
  
    const allUsers = await prisma.user.findMany({
      include: {
        articles: true,
        roles: true,
      },
    })
    console.dir(allUsers, { depth: null })
  }

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })