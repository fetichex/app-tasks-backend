const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
  errorFormat: 'pretty'
})

async function getAllPosts() {
  try {
    const posts = await prisma.Post.findMany()
    return posts
  } catch (err) {
    throw Error(err)
  }
}

async function getUserPosts(userNick) {
  try {
    const posts = await prisma.Post.findMany({
      where: { userNick }
    })
    return posts
  } catch (err) {
    throw Error(err)
  }
}

async function createPost(content, nick) {
  try {
    const post = await prisma.User.update({
      where: { nick },
      data: { post: { create: { content } } }
    })
    return post
  } catch (err) {
    throw Error(err)
  }
}

async function editPost(nick, id, content) {
  try {
    const post = await prisma.User.update({
      where: { nick },
      include: { post: { where: { id } } },
      data: {
        post: {
          update: [
            {
              data: { content },
              where: { id }
            }
          ]
        }
      }
    })
    const info = {
      content: post.post[0].content,
      updateAt: post.post[0].updatedAt
    }
    return info
  } catch (err) {
    throw Error(err)
  }
}

async function deletePost(nick, id) {
  try {
    await prisma.User.update({
      where: { nick },
      data: {
        post: { delete: [{ id }] }
      }
    })
  } catch (err) {
    throw Error(err)
  }
}

module.exports = { createPost, deletePost, getAllPosts, getUserPosts, editPost }
