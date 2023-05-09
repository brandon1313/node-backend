import Role from '../models/Role'
import User from '../models/User'
import  jwt  from 'jsonwebtoken'
import config from '../config'

const signin = async (req, res) => {
    const { email, password } = req.body

    const userFound = await User.findOne({ email }).populate('roles')
    if (!userFound) return res.status(400).json({ message: 'user not found.' })

    const isCorrectPassword = await User.comparePassword(password, userFound.password)
    if (!isCorrectPassword)
        return res.status(401).json({ message: 'Password invalid.' })
    
    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    })

    res.status(200).json({userName: userFound.userName, token, roles: userFound.roles})
}

const signup = async (req, res) => {
    const { userName, email, password, roles } = req.body

    const user = new User({
        userName,
        email,
        password: await User.encryptPassword(password)
    })

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })
        user.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({ name: 'user' })
        user.roles = [role._id]
    }

    const userSaved = await user.save()

    res.json(userSaved)
}

export { signin, signup }