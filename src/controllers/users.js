const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
  errorFormat: 'pretty'
})

async function getAllUsers() {
  try {
    const users = await prisma.User.findMany()
    return users
  } catch (err) {
    throw Error(err)
  }
}

async function getUser(nick) {
  try {
    const user = await prisma.User.findUnique({
      where: { nick },
      include: { post: true }
    })
    return user
  } catch (err) {
    throw Error(err)
  }
}

async function createUser(nick) {
  try {
    const user = await prisma.User.create({
      data: {
        nick: nick.toLowerCase(),
        email: `${nick}-email@test.js`,
        avatar: `https://i.pravatar.cc/150?u=${nick}`
      }
    })
    return user
  } catch (err) {
    throw Error(err)
  }
}

async function updateAvatar(nick, avatar) {
  try {
    const updateAvatar = await prisma.User.update({
      where: { nick },
      data: { avatar }
    })
    return updateAvatar
  } catch (err) {
    throw Error(err)
  }
}

async function deleteUser(nick) {
  try {
    await prisma.User.update({
      where: { nick },
      data: {
        post: { deleteMany: {} }
      }
    })
    await prisma.User.delete({
      where: { nick }
    })
  } catch (err) {
    throw Error(err)
  }
}

module.exports = { getAllUsers, createUser, deleteUser, getUser, updateAvatar }
