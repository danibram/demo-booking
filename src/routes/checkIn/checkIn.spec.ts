import test from 'ava'
import server from '../../server'

test.beforeEach(async t => {
    await server.ready()
})

test('check in', async t => {
    let response = await server.inject({
        method: 'POST',
        url: '/booking',
        payload: { room: '001' }
    })

    const newBooking = JSON.parse(response.payload)

    console.log(newBooking)

    response = await server.inject({
        method: 'POST',
        url: `/check-in/${newBooking.id}`,
        payload: { name: 'Daniel Biedma', email: 'info@dbr.io' }
    })

    t.is(response.statusCode, 200)

    response = await server.inject({ method: 'GET', url: '/bookings' })

    t.is(response.statusCode, 200)

    const payload = JSON.parse(response.payload)

    t.is(Object.keys(payload.bookings).length, 1)
    t.is(Object.keys(payload.bookings)[0], newBooking.id)

    const booking = payload.bookings[newBooking.id]

    t.is(booking.status, 'checkin')
    t.is(booking.guest.name, 'Daniel Biedma')
    t.is(booking.guest.email, 'info@dbr.io')
})
