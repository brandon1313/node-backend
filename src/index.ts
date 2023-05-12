import app from './app'
import { connectDB } from './database'

app.listen(3000);

connectDB()
console.log('server listening on port', 3000)