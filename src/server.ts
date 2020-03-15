import 'fastify'
import * as fastify from 'fastify'
import fastifyBlipp from 'fastify-blipp-log'
import * as http from 'http'
import { IncomingMessage, Server, ServerResponse } from 'http'
import { IS_TESTING_ENV, PORT } from './envs'
import routes from './router'
import { database, DB } from './utils/db'
import { IBooking } from './utils/types'

declare module 'fastify' {
    export interface FastifyInstance<
        HttpServer = http.Server,
        HttpRequest = http.IncomingMessage,
        HttpResponse = http.ServerResponse
    > {
        db: DB<IBooking>
    }
}

const server: fastify.FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
> = fastify({
    logger: IS_TESTING_ENV
        ? undefined
        : {
              prettyPrint: { colorize: true }
          }
})

server.register(fastifyBlipp)
server.register(database)

server.register(routes)

export const start = (server => async () => {
    try {
        await server.listen(Number(PORT), '0.0.0.0')
        server.prettyPrintRoutes()
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
})(server)

export default server
