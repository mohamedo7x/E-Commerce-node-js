import * as dotenv from 'dotenv';
dotenv.config();


const connection = async (mongoose) => {
    await mongoose
    .set('strictQuery', false)
    .connect(process.env.MONGO_URL)
    .then(() => console.log("successful connection"))
    .catch((err) => console.log(err));
}
export default connection;

