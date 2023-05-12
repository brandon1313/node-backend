import {Schema, model} from 'mongoose'

export interface IProduct {
    name: String,
    category: String,
    price: Number,
    imgUrl: String
}
const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    imgUrl: String
}, {
    timestamps: true,
    versionKey: false
})


export default model<IProduct>('product', productSchema)