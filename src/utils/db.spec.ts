import test from 'ava'
import { DB } from './db'
import { IBooking } from './types'

const fakeBooking = {
    room: '001',
    status: 'booking',
    guest: {
        name: 'Daniel',
        email: 'info@dbr.io'
    }
}

test.beforeEach(t => {
    t.context['db'] = new DB<IBooking>()
})

test('create', async t => {
    const db = t.context['db']

    const dbBooking = db.create(fakeBooking)
    const createdBooking = db.collection[dbBooking.id]

    t.not(createdBooking, null)
    t.not(createdBooking.updatedAt, null)
    t.not(createdBooking.createdAt, null)
    t.is(createdBooking.room, fakeBooking.room)
    t.is(createdBooking.status, fakeBooking.status)
    t.not(createdBooking.guest, null)
    t.not(createdBooking.guest.name, null)
    t.not(createdBooking.guest.email, null)
    t.is(createdBooking.guest.name, fakeBooking.guest.name)
    t.is(createdBooking.guest.email, fakeBooking.guest.email)
})

test('getAll', async t => {
    const db = t.context['db']
    const length = 8

    Array(length)
        .fill(0)
        .map(() => db.create(fakeBooking))

    const bookings = db.getAll()

    t.is(Object.keys(bookings).length, length)
})

test('getById', async t => {
    const db = t.context['db']

    const booking = db.create(fakeBooking)
    const booking1 = db.getById(booking.id)

    t.not(booking1, null)
    t.is(booking1.id, booking.id)
})

test('update', t => {
    const db = t.context['db']

    const statusUpdated = 'checkin'
    const booking = db.create(fakeBooking)
    const updated = db.update(booking.id, {
        status: statusUpdated
    })

    t.is(updated.status, statusUpdated)
    t.is(updated.status, db.collection[booking.id].status)
})

test('delete', t => {
    const db = t.context['db']

    const booking = db.create(fakeBooking)
    const length = Object.keys(db.getAll()).length
    db.delete(booking.id)
    const lengthAfterDelete = Object.keys(db.getAll()).length

    t.not(length, lengthAfterDelete)
    t.is(length, 1)
    t.is(lengthAfterDelete, 0)
    t.throws(() => db.getById(booking.id))
})
