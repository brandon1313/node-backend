import { Router } from 'express'
import AuthController from '../controllers/auth.controller'

export default class AuthRoutes{
    public router: Router
    private authController: AuthController
    constructor(){
        this.router = Router()
        this.authController = new AuthController()
    }

    protected setupRoutes(): void {
        this.router.post('/signup', this.authController.signup)
        this.router.post('/signin', this.authController.signin)
    }
}




