import * as fp from 'fastify-plugin'
import { booking, bookings } from './routes'
import { bookingBodySchema } from './routes/booking/booking.schemas'

export default fp(async (server, opts, next) => {
    server.route({
        url: '/',
        logLevel: 'warn',
        method: ['GET'],
        handler: async (request, reply) =>
            reply.send('Danger Will Robinson! Danger!')
    })

    server.route({
        url: '/bookings',
        logLevel: 'warn',
        method: ['GET'],
        handler: bookings(server)
    })

    server.route({
        url: '/booking',
        logLevel: 'warn',
        method: 'POST',
        schema: bookingBodySchema,
        handler: booking(server)
    })

    server.route({
        url: '/check-in/:id',
        logLevel: 'warn',
        method: 'POST',
        schema: {},
        handler: async (request, reply) => reply.send('Not implemented')
    })

    server.route({
        url: '/door-open/:id',
        logLevel: 'warn',
        method: 'POST',
        schema: {},
        handler: async (request, reply) => reply.send('Not implemented')
    })

    server.route({
        url: '/check-out/:id',
        logLevel: 'warn',
        method: 'POST',
        schema: {},
        handler: async (request, reply) => reply.send('Not implemented')
    })

    next()
})
