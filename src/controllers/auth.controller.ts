import Role, { IRole } from '../models/Role'
import User, { IUser } from '../models/User'
import  jwt  from 'jsonwebtoken'
import config from '../config'
import { Request, Response } from 'express'

const signin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    const userFound: IUser = await User.findOne({ email }).populate('roles') as IUser
    if (!userFound) {
        res.status(400).json({ message: 'user not found.' })
        return
    }

    const isCorrectPassword: boolean = await User.comparePassword(password, userFound.password)
    if (!isCorrectPassword){
        res.status(401).json({ message: 'Password invalid.' })
        return
    } 
    const token: string = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    })

    res.status(200).json({userName: userFound.userName, token, roles: userFound.roles})
}

const signup = async (req: Request, res: Response) => {
    const { userName, email, password, roles } = req.body

    const user: IUser = new User({
        userName,
        email,
        password: await User.encryptPassword(password)
    })

    if (roles) {
        const foundRoles: IRole[] = await Role.find({ name: { $in: roles } })
        user.roles = foundRoles
    } else {
        const role: IRole = await Role.findOne({ name: 'user' }) as IRole
        user.roles = [role]
    }

    const userSaved = await user.save()

    res.json(userSaved)
}

export { signin, signup }