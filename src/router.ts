import * as fp from 'fastify-plugin'

export default fp(async (server, opts, next) => {
    server.route({
        url: '/',
        logLevel: 'warn',
        method: ['GET'],
        handler: async (request, reply) =>
            reply.send('Danger Will Robinson! Danger!')
    })

    server.route({
        url: '/info',
        logLevel: 'warn',
        method: ['GET'],
        handler: async (request, reply) => {}
    })

    server.route({
        url: '/booking',
        logLevel: 'warn',
        method: 'POST',
        schema: {},
        handler: async (request, reply) => {}
    })

    server.route({
        url: '/check-in/:id',
        logLevel: 'warn',
        method: 'POST',
        schema: {},
        handler: async (request, reply) => {}
    })

    server.route({
        url: '/door-open/:id',
        logLevel: 'warn',
        method: 'POST',
        schema: {},
        handler: async (request, reply) => {}
    })

    server.route({
        url: '/check-out/:id',
        logLevel: 'warn',
        method: 'POST',
        schema: {},
        handler: async (request, reply) => {}
    })

    next()
})
