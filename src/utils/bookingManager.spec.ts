import test from 'ava'
import { bookingManager as BM } from './bookingManager'

test('create', async t => {
    const booking = BM.create('404')
    t.is(booking.room, '404')
})

test('check in', async t => {
    const booking = BM.create('404')

    const checkedInBooking = BM.checkIn(booking, {
        name: 'Daniel Biedma',
        email: 'info@dbr.io',
        code: '012345'
    })

    t.is(checkedInBooking.status, 'checkin')
    t.is(checkedInBooking.code, '012345')
    t.not(checkedInBooking.guest, null)
    t.is(checkedInBooking.guest.name, 'Daniel Biedma')
    t.is(checkedInBooking.guest.email, 'info@dbr.io')
})

test('door open', async t => {
    let booking = BM.create('404')

    booking = BM.checkIn(booking, {
        name: 'Daniel Biedma',
        email: 'info@dbr.io',
        code: '012345'
    })

    t.is(booking.log.length, 2)

    booking = BM.doorOpen(booking)

    t.is(booking.log.length, 3)
    t.is(booking.log[2].desc, 'Door opened')

    booking = BM.doorOpen(booking)

    t.is(booking.log.length, 4)
    t.is(booking.log[3].desc, 'Door opened')
})

test('check out', async t => {
    let booking = BM.create('404')
    booking = BM.checkIn(booking, {
        name: 'Daniel Biedma',
        email: 'info@dbr.io',
        code: '012345'
    })
    booking = BM.doorOpen(booking)
    booking = BM.checkout(booking)

    t.is(booking.log.length, 4)
    t.is(booking.log[3].desc, 'Check out Done')
    t.is(booking.status, 'checkout')

    t.throws(() =>
        BM.checkIn(booking, {
            name: 'Daniel Biedma',
            email: 'info@dbr.io',
            code: '012345'
        })
    )

    t.throws(() => BM.doorOpen(booking))

    t.throws(() => BM.checkout(booking))
})
