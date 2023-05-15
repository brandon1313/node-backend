import mongoose, { Schema, model } from 'mongoose'

export interface IRole extends mongoose.Document{
    name: string,
    _id: string
}

const roleSchema: Schema = new Schema({
    name: String,
}, {
    versionKey: false
})

export default model<IRole>('role', roleSchema)