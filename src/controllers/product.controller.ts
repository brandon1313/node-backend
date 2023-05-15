import Product from '../models/Product'
import { Request, Response } from 'express'

export default class ProductController {
    createProduct = async (req: Request, res: Response) => {
        const { name, category, price, imgUrl } = req.body
        const newProduct = new Product({ name, category, price, imgUrl })
        const productSaved = await newProduct.save()
        res.status(201).json(productSaved)
    }

    getProducts = async (req: Request, res: Response): Promise<void> => {
        const products = await Product.find()
        res.send(products)
    }

    getProductById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)

    }

    updateProductById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params
        const { body } = req
        const updatedProduct = await Product.findByIdAndUpdate(id, body, {
            new: true
        })
        res.status(200).json(updatedProduct)
    }

    deleteProductById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params
        await Product.findOneAndDelete({ id })
        res.status(200).json(`Product with id: ${id} has been deleted.`)
    }
}