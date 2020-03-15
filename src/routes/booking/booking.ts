import { bookingManager as BM } from '../../utils/bookingManager'

export const booking = ctx => async (req, reply) => {
    const { room } = req.body

    const newBooking = BM.create(room)
    const booking = ctx.db.create(newBooking)

    return reply.send(booking)
}
