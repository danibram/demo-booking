import * as fp from 'fastify-plugin'
import { booking, bookings, checkIn, openDoor } from './routes'
import { bookingSchema } from './routes/booking/booking.schema'
import { checkInSchema } from './routes/checkIn/checkIn.schema'
import { openDoorSchema } from './routes/openDoor/openDoor.schema'

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
        schema: bookingSchema,
        handler: booking(server)
    })

    server.route({
        url: '/check-in/:id',
        logLevel: 'warn',
        method: 'POST',
        schema: checkInSchema,
        handler: checkIn(server)
    })

    server.route({
        url: '/open-door/:id',
        logLevel: 'warn',
        method: 'POST',
        schema: openDoorSchema,
        handler: openDoor(server)
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
