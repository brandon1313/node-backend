import { Request, Response } from "express"
import User from "../models/User"

export class UserController {
    getUsers = async (req: Request, res: Response): Promise<void> => {
        const users = await User.find({})
        res.json(users)
    }
}
