import Cat from '../schema/CategoriesShchema.js';
import {showCat , createCat , updateCat , deleteCat , showCatAll} from '../controller/categories.js'
import express from 'express';
const route = express.Router();

route.get('/all' , showCatAll)
route.get('/' ,showCat );
route.post('/create' ,createCat);
route.put('/update/:name' , updateCat )
route.delete('/delete/:name' , deleteCat)

export default route;