import { Router } from 'express'
import ProductController from '../controllers/product.controller';
import { verifyToken, hasRole } from '../middlewares/authJwt'

export default class ProductRoutes {
    public router: Router

    private productController: ProductController = new ProductController()

    constructor() {
        this.router = Router()
        this.registerRoutes()
    }

    protected registerRoutes(): void {
        this.router.get('/', verifyToken, this.productController.getProducts)

        this.router.post('/', verifyToken, this.productController.createProduct)

        this.router.put('/:id', [verifyToken, hasRole('moderator')], this.productController.updateProductById)

        this.router.get('/:id', verifyToken, this.productController.getProductById)

        this.router.delete('/:id', [verifyToken, hasRole('admin')], this.productController.deleteProductById)
    }

}
