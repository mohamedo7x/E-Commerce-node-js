import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
    name : {type:String,
        uppercase:true
    },
    image : {type : String}
} , {timestamps:true})

export default mongoose.model('Brand' , BrandSchema);