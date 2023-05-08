import express from 'express';
import SubcatSchema from '../schema/SubcatSchema.js';
import {createSub , showallSub , showSub , deleteSub , updateSub} from '../controller/subcatgories.js'
const route = express.Router();

route.get('/all' , showallSub)
route.get('/' ,showSub );
route.post('/create' ,createSub);
route.put('/update/:name' , updateSub )
route.delete('/delete/:name' , deleteSub)


export default route;
