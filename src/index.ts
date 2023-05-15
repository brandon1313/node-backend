import {App} from './app'
import { connectDB } from './database'

const app = new App()
app.start()
connectDB()
console.log('server listening on port', 3000)