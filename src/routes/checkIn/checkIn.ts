import axios from 'axios'
import { AC_SERVICE_WWW, IS_TESTING_ENV } from '../../envs'
import { bookingManager as BM, isInBooking } from '../../utils/bookingManager'

export const checkIn = ctx => async (req, reply) => {
    const { id } = req.params
    const { name, email } = req.body

    const booking = ctx.db.getById(id)

    if (!isInBooking(booking)) {
        throw new Error('Booking status invalid for check-in.')
    }

    let code
    if (IS_TESTING_ENV) {
        code = 'test-room'
    } else {
        const response = await axios.post(
            `http://${AC_SERVICE_WWW}/api/access_code`
        )

        code = String(response.data.code)
    }

    if (!code) {
        throw new Error('Invalid code recieved.')
    }

    const updatedBooking = BM.checkIn(booking, { name, email, code })

    const updated = ctx.db.update(id, updatedBooking)

    return reply.send(updated)
}
