import Product from '../models/Product'


export const createProduct = async (req, res) => {
    const { name, category, price, imgUrl } = req.body
    const newProduct = new Product({ name, category, price, imgUrl })
    const productSaved = await newProduct.save()
    res.status(201).json(productSaved)
}

export const getProducts = async (_, res) => {
    const products = await Product.find()
    res.json(products)
}

export const getProductById = async ({ params: { id } }, res) => {
    const product = await Product.findById(id)
    res.status(200).json(product)

}

export const updateProductById = async (req, res) => {
    const { id } = req.params
    const { body } = req
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
        new: true
    })
    res.status(200).json(updatedProduct)
}

export const deleteProductById = async (req, res) => {
    const { id } = req.params
    await Product.findOneAndDelete(id)
    res.status(200).json(`Product with id: ${id} has been deleted.`)
}
