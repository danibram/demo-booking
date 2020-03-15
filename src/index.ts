import * as sourceMapSupport from 'source-map-support'
import { start } from './server'

sourceMapSupport.install()

process.on('uncaughtException', error => {
    console.error(error)
})
process.on('unhandledRejection', error => {
    console.error(error)
})

start()
