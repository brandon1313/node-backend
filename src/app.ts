import express, { Application } from 'express'
import morgan from 'morgan'
// @ts-ignore
import pkg from '../package.json'
import authRoutes from './routes/auth.routes'
import { createRoles } from './libs/initialSetup'
import UserRoutes from './routes/user.routes'
import ProductRoutes from './routes/products.routes'

export class App {
    public app: Application;
    constructor() {
        createRoles()
        this.app = express()
        this.config()
    }

    public config(): void {
        this.app.use(morgan('dev'))
        this.app.set('info', pkg)
        this.app.use(express.json())
        this.app.use('/api/products', new ProductRoutes().router)
        this.app.use('/api/auth', authRoutes)
        this.app.use('/api/users', new UserRoutes().router)
        this.app.get('/', (req, res) => {
            res.json({
                author: this.app.get('info').author
            })
        })

    }

    public start(): void{
        this.app.listen(3000, () => {
            console.log('Listening to port 3000!')
        })
    }
}







