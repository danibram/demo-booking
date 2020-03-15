import test from 'ava'
import server from '../../server'

test.beforeEach(async t => {
    await server.ready()
})

test('door open', async t => {
    let response = await server.inject({
        method: 'POST',
        url: '/booking',
        payload: { room: '001' }
    })

    const { id } = JSON.parse(response.payload)

    response = await server.inject({
        method: 'POST',
        url: `/check-in/${id}`,
        payload: { name: 'Daniel Biedma', email: 'info@dbr.io' }
    })

    response = await server.inject({
        method: 'POST',
        url: `/open-door/${id}`
    })

    t.is(response.statusCode, 200)

    response = await server.inject({ method: 'GET', url: '/bookings' })

    t.is(response.statusCode, 200)

    const payload = JSON.parse(response.payload)

    t.is(Object.keys(payload.bookings).length, 1)
    t.is(Object.keys(payload.bookings)[0], id)

    const booking = payload.bookings[id]

    t.is(booking.status, 'checkin')
    t.is(booking.log[booking.log.length - 1].desc, 'Door opened')
})
