const {
  getAllUsers,
  createUser,
  deleteUser,
  getUser,
  updateAvatar
} = require('../controllers/users')

async function routes(fastify) {
  const handleReply = (code, data, reply) => {
    return reply
      .code(code)
      .header('Content-Type', 'application/json')
      .send(data)
  }
  fastify.get('/', async (_, reply) => {
    const msg = { API: 'v01' }
    handleReply(200, msg, reply)
  })

  fastify.get('/users', async (_, reply) => {
    try {
      const posts = await getAllUsers()
      handleReply(200, posts, reply)
    } catch (err) {
      handleReply(404, err, reply)
    }
  })

  fastify.get('/:nick', async (request, reply) => {
    const { nick } = request.params
    try {
      const user = await getUser(nick)
      handleReply(200, user, reply)
    } catch (err) {
      handleReply(404, err, reply)
    }
  })

  fastify.post('/', async (request, reply) => {
    const { nick } = request.body
    try {
      const newUser = await createUser(nick)
      handleReply(201, newUser, reply)
    } catch (err) {
      handleReply(400, err, reply)
    }
  })

  fastify.put('/:nick', async (request, reply) => {
    const { nick } = request.params
    const { newAvatar } = request.body
    console.log(newAvatar)
    try {
      const avatar = await updateAvatar(nick, newAvatar)
      handleReply(200, avatar, reply)
    } catch (err) {
      handleReply(400, err, reply)
    }
  })

  fastify.delete('/:nick', async (request, reply) => {
    const { nick } = request.params
    try {
      const deletedUser = deleteUser(nick)
      handleReply(204, deletedUser, reply)
    } catch (err) {
      fastify.log.error(err)
    }
  })
}

module.exports = routes
