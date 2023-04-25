import express from 'express';
const router = express.Router();

import {user , register , login , logout , updateUser} from '../controller/userController.js'

router.get('/' ,user);
router.post('/register' , register);
router.post('/login' , login);
router.post('/login' , logout);
router.route('/update').put('/:id' , updateUser);

export default router;