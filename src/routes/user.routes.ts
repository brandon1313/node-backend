import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { hasRole, verifyToken } from '../middlewares/authJwt'


export default class UserRoutes {

    public router: Router
    private userController: UserController

    constructor(){
        this.router = Router()
        this.registerRoutes()
        this.userController = new UserController()
    }

    protected registerRoutes(): void {
        this.router.get("/", [verifyToken, hasRole('admin')], this.userController.getUsers)
    }

}

