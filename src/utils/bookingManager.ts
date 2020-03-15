import { IBooking, IGuestBooking } from './types'

export const bookingManager = {
    create: (roomNumber): IBooking => ({
        room: roomNumber,
        code: '',
        status: 'booking',
        guest: { name: '', email: '' },
        log: [
            {
                ts: new Date(),
                desc: 'Booking Created'
            }
        ]
    }),
    checkIn: (
        booking: IBooking,
        { name, email, code }: IGuestBooking & { code: string }
    ): IBooking => {
        if (booking.status === 'checkout') {
            throw new Error('You cant modify the booking.')
        }

        return {
            ...booking,
            status: 'checkin',
            code,
            guest: { name, email },
            log: [
                ...booking.log,
                {
                    ts: new Date(),
                    desc: 'Booking checked in'
                }
            ]
        }
    },
    doorOpen: (booking: IBooking): IBooking => {
        if (booking.status === 'checkout') {
            throw new Error('You cant modify the booking.')
        }

        return {
            ...booking,
            log: [
                ...booking.log,
                {
                    ts: new Date(),
                    desc: 'Door opened'
                }
            ]
        }
    },
    checkout: (booking: IBooking): IBooking => {
        if (booking.status === 'checkout') {
            throw new Error('You cant modify the booking.')
        }

        return {
            ...booking,
            status: 'checkout',
            log: [
                ...booking.log,
                {
                    ts: new Date(),
                    desc: 'Check out Done'
                }
            ]
        }
    }
}
