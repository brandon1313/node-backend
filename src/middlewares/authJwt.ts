import jwt from 'jsonwebtoken';
import config from '../config';
import User, { IUser, IUserModel } from '../models/User';
import Role, { IRole } from '../models/Role';
import { Request, Response, NextFunction } from 'express';

export interface TokenRequest extends Request{
    userId: String;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["x-access-token"]?.toString();

    if (!token) return res.status(403).json({ message: 'No token provided.' });

    try {
        const userId = getId(req.headers)
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
};

const getId = (headers: any) => {
    const token = headers["x-access-token"]?.toString();
    const _decoded: any = jwt.verify(token, config.SECRET);
    return  _decoded.id
}

export const hasRole = (role: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = getId(req.headers)
        const user: IUser = await User.findById(userId, { password: 0 }) as IUser
        const roles: IRole[] = await Role.find({ _id: { $in: user?.roles } });

        const moderatorRoles: IRole[] = roles.filter(r => r.name === role);

        if (moderatorRoles.length === 0) return res.status(403).json({ message: 'User doesnt has roles to perform this operation.' });

        next();
    };
