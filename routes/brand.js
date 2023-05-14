import express from 'express';
import { CreateBrand,getBrands,updateBrand,deleteBrand,getBrand} from '../controller/brand.Controler.js'
const router = express.Router();


router.route('/create').post(CreateBrand);
router.route('/all').get(getBrands);
router.route('/:id').put(updateBrand);
router.route('/:id').delete(deleteBrand);
router.route('/:id').get(getBrand);



export default router;