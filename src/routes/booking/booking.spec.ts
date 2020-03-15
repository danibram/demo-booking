import test from 'ava'
import server from '../../server'

test.beforeEach(async t => {
    await server.ready()
})

test('booking', async t => {
    let response = await server.inject({
        method: 'POST',
        url: '/booking',
        payload: { room: '001' }
    })

    t.is(response.statusCode, 200)

    const newBooking = JSON.parse(response.payload)

    t.is(newBooking.status, 'booking')
    t.is(newBooking.room, '001')

    response = await server.inject({ method: 'GET', url: '/bookings' })

    t.is(response.statusCode, 200)

    const payload = JSON.parse(response.payload)

    t.is(Object.keys(payload.bookings).length, 1)
    t.is(Object.keys(payload.bookings)[0], newBooking.id)
})
