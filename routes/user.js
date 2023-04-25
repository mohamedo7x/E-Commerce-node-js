import express from 'express';
const router = express.Router();


import {users , register , user , login  , updateUser , deleteUser , logout} from '../controller/userController.js'

router.get('/' ,users);
router.post('/register' , register);
router.post('/login' , login);
router.post('/logout' , logout)
router.route('/:id').get(user);
router.route('/update/:id').put(updateUser);

export default router;