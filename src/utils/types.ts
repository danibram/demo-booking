export type IStatusBooking = 'booking' | 'checkin' | 'checkout' | 'deleted'

export type IGuestBooking = {
    name: string
    email: string
}

export type ILogBooking = { ts: Date; desc: string }

export type IBooking = {
    id?: string
    room: string
    code: string
    status: IStatusBooking
    guest: {} | IGuestBooking
    log: ILogBooking[]
    createdAt: Date
    updatedAt: Date
}

export type IUpdateBooking = {
    room?: string
    code?: string
    status?: IStatusBooking
    guest?: {} | IGuestBooking
    log?: ILogBooking[]
    createdAt?: Date
    updatedAt?: Date
}
