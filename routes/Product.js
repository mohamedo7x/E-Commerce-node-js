import express from 'express';
import {
    crateProduct,
    updateProduct,
    getAllProduct,
    getProduct,
    deleteProduct
} from '../controller/Product.Controller.js'

const router = express.Router();

router.route('/create').post(crateProduct);
router.route('/all').get(getAllProduct);
router.route('/:id').get(getProduct);
router.route('/:id').delete(deleteProduct);
router.route('/:id').put(updateProduct);

export default router;