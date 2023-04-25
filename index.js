import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import connection from './db/connect.js';
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;




/* Routes */
import userRoute from './routes/user.js'



app.use('/api/users' , userRoute);

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