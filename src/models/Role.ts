import mongoose, { Schema, model } from 'mongoose'

interface IRole extends mongoose.Document{
    name: string
}

const roleSchema: Schema = new Schema({
    name: String,
}, {
    versionKey: false
})

export default model<IRole>('role', roleSchema)