import { Router } from 'express'
import { getUsers } from '../controllers/user.controller'
import { hasRole, verifyToken } from '../middlewares'

const router = Router()

router.get("/", [verifyToken, hasRole('admin')], getUsers)

export default router