import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    roles: [{
        ref: 'role',
        type: Schema.Types.ObjectId
    }]
},{
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
     const salt = await bcrypt.genSalt(10)
     return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, newPassword) => {
    return await bcrypt.compare(password, newPassword)
}

export default model('user', userSchema)