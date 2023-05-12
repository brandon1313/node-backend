import mongoose, { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import { IRole } from './Role'

export interface IUser extends mongoose.Document {
    userName: string,
    email: string,
    password: string,
    roles: IRole[]
}

export interface IUserModel extends mongoose.Model<IUser> {
    encryptPassword: (password: string) => Promise<string>,
    comparePassword: (password: string, newPassword: string) => Promise<boolean>
}

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: 'role',
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async (password): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, newPassword): Promise<boolean> => {
    return await bcrypt.compare(password, newPassword)
}

export default model<IUser, IUserModel>('user', userSchema)