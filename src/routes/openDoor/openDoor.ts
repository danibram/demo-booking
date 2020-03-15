import { bookingManager as BM, isInCheckIn } from '../../utils/bookingManager'

export const openDoor = ctx => async (req, reply) => {
    const { id } = req.params

    const booking = ctx.db.getById(id)

    if (!isInCheckIn(booking)) {
        throw 'Booking status invalid for open door.'
    }

    const updatedBooking = BM.doorOpen(booking)

    const updated = ctx.db.update(id, updatedBooking)

    return reply.send(updated)
}
