const {
  getUserPosts,
  createPost,
  deletePost,
  getAllPosts,
  editPost
} = require('../controllers/posts')

async function routes(fastify) {
  const handleReply = (code, data, reply) => {
    return reply
      .code(code)
      .header('Content-Type', 'application/json')
      .send(data)
  }

  fastify.get('/posts', async (_, reply) => {
    try {
      const posts = await getAllPosts()
      handleReply(200, posts, reply)
    } catch (err) {
      handleReply(404, err, reply)
    }
  })

  fastify.get('/:nick/posts', async (request, reply) => {
    const { nick } = request.params
    try {
      const posts = await getUserPosts(nick)
      handleReply(200, posts, reply)
    } catch (err) {
      handleReply(404, err, reply)
    }
  })

  fastify.post('/:nick', async (request, reply) => {
    const { nick } = request.params
    const { content } = request.body
    try {
      const post = await createPost(content, nick)
      handleReply(201, post, reply)
    } catch (err) {
      handleReply(404, err, reply)
    }
  })

  fastify.put('/:nick/:id', async (request, reply) => {
    const { nick, id } = request.params
    const { content } = request.body
    try {
      const newPost = await editPost(nick, id, content)
      handleReply(200, newPost, reply)
    } catch (err) {
      handleReply(404, err, reply)
    }
  })

  fastify.delete('/:nick/:id', async (request, reply) => {
    const { nick, id } = request.params
    try {
      await deletePost(nick, id)
      handleReply(204, null, reply)
    } catch (err) {
      handleReply(204, err, reply)
    }
  })
}

module.exports = routes
