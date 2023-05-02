import express from 'express';
const router = express.Router();

import {user , register , login , logout , updateUser ,changePassword } from '../controller/userController.js'

router.get('/' ,user);
router.post('/register' , register);
router.post('/login' , login);
router.post('/logout' , logout);
router.put('/update' , updateUser);
//router.put('/changePWD' , changePassword); Im working on it :)

export default router;