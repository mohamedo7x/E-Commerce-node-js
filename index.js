import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import connection from './db/connect.js';
import userRoute from './routes/user.js'
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;




/* Routes */

app.use('/api/user' , userRoute);


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