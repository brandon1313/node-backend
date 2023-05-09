import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token) return res.status(403).json({ message: 'No token provided.' })

    try {
        const _decoded = jwt.verify(token, config.SECRET)
        req.userId = _decoded.id
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error })
    }

}

export const hasRole = (role) =>
    async (req, res, next) => {
        const user = await User.findById(req.userId, { password: 0 })
        const roles = await Role.find({ _id: { $in: user.roles } })

        const moderatorRole = roles.filter(r => r.name === role)

        if (moderatorRole.length === 0) return res.status(403).json({ message: 'User doesnt has roles to perform this operation.' })

        next()
    }