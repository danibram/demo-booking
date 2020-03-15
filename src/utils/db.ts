import * as fp from 'fastify-plugin'
import { v1 as uuid } from 'uuid'
import { timeout } from './helpers'
import { IBooking } from './types'

export class DB<T> {
    collection: {
        [key: string]: T
    } = {}

    connect = async () => {
        await timeout(1000)
        return 'ok'
    }

    create(input) {
        const id = uuid()

        const newData = {
            id,
            ...input,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.collection = {
            ...this.collection,
            [id]: newData
        }

        return newData as T
    }

    getById(id: string) {
        if (!this.collection[id]) {
            throw new Error('Id not found.')
        }

        return this.collection[id] as T
    }

    getAll() {
        return this.collection
    }

    update(id, update) {
        if (!this.collection[id]) {
            throw new Error('Id not found.')
        }

        const updated = {
            ...this.collection[id],
            ...update,
            updatedAt: new Date()
        }

        this.collection[id] = updated

        return updated as T
    }

    delete(id) {
        if (!this.collection[id]) {
            throw new Error('Id not found.')
        }

        const deleted = this.collection[id]

        delete this.collection[id]

        return deleted as T
    }
}

export const database = fp(async (fastify, opts: { uri: string }, next) => {
    const db = new DB<IBooking>()

    await db.connect()
    fastify.log.info('Database `connected` =)')
    fastify.decorate('db', new DB<IBooking>())
    next()
})
