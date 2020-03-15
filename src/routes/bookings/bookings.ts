export const bookings = ctx => async (req, reply) =>
    reply.send({
        ts: new Date(),
        bookings: ctx.db.getAll()
    })
