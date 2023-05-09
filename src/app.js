import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import productRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import { createRoles } from './libs/initialSetup'
import userRoutes from './routes/user.routes'

const app = express()
createRoles()

app.use(morgan('dev'))

app.set('info', pkg)

app.use(express.json())
app.use('/api/products',productRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/users', userRoutes)
app.get('/',(req, res) => {
    res.json({
        author: app.get('info').author
    })
})

export default app


