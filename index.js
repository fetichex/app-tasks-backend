require('dotenv').config()
const fastify = require('fastify')({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        ignore: 'pid,hostname,time'
      }
    }
  }
})
fastify.register(require('./src/routes/posts'))
fastify.register(require('./src/routes/users'))
fastify.register(require('@fastify/jwt'), {
  secret: process.env.JWT_SECRET
})

fastify.listen({ port: 3001 }, (err) => {
  if (err) throw err
  // fastify.log.info(`server listening on ${fastify.server.address().port}`)
})
