export const bookings = fastify => async (req, reply) =>
    reply.send({
        ts: new Date(),
        bookings: fastify.db.getAll()
    })
