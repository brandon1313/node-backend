import { Router } from 'express'
import * as productController from '../controllers/product.controller'
import { verifyToken, hasRole } from '../middlewares/authJwt'

const router: Router = Router()

router.get('/', verifyToken, productController.getProducts)

router.post('/', verifyToken, productController.createProduct)

router.put('/:id', [verifyToken, hasRole('moderator')], productController.updateProductById)

router.get('/:id', verifyToken, productController.getProductById)

router.delete('/:id', [verifyToken, hasRole('admin')], productController.deleteProductById)


export default router