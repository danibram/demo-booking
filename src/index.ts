import { start } from './server'

process.on('uncaughtException', error => {
    console.error(error)
})
process.on('unhandledRejection', error => {
    console.error(error)
})

start()
