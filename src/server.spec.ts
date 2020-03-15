import test from 'ava'
import server from './server'

test.beforeEach(async t => {
    await server.ready()
})

test('starts', async t => {
    const response = await server.inject({ method: 'GET', url: '/' })

    t.is(response.statusCode, 200)
})
