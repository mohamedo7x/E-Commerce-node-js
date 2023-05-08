import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import connection from './db/connect.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;




/* Routes */
import subcat from './routes/subcategories.js'
import userRoute from './routes/user.js';
import CatRoute from './routes/categories.js';
const api = process.env.API
app.use(`/${api}/user` , userRoute);
app.use(`/${api}/cat` , CatRoute);
app.use(`/${api}/subcat` , subcat)
// Server And DB connections
const server = async ()=> {
    try {
        await connection(mongoose);
        app.listen(PORT , console.log(`http://localhost:${PORT}`));
    } catch (error) {
        console.trace('There an error');
        console.log(error);
    }
}
server();