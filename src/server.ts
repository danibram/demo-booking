import * as fastify from 'fastify'
import fastifyBlipp from 'fastify-blipp-log'
import { IncomingMessage, Server, ServerResponse } from 'http'

const server: fastify.FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
> = fastify({
    logger: {
        prettyPrint: { colorize: true }
    }
})

server.register(fastifyBlipp)

export const start = (server => async () => {
    try {
        await server.listen(3001, '0.0.0.0')
        server.prettyPrintRoutes()
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
})(server)

export default server
