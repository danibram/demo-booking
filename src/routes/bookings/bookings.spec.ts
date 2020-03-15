import test from 'ava'
import server from '../../server'

test.beforeEach(async t => {
    await server.ready()
})

test('bookings', async t => {
    const response = await server.inject({ method: 'GET', url: '/bookings' })

    t.is(response.statusCode, 200)

    const payload: { bookings: {}; ts: Date } = JSON.parse(response.payload)

    t.not(payload.ts, null)
    t.not(payload.bookings, null)
})
