import mongoose from "mongoose";

const Product = new mongoose.Schema({
    title : {
        type : String,
    },
    description : {
    type:String
    },
    modelName : {type:String},
    quantity : {type : Number},
    sold : {type: Number , default : 0},
    price : {type : Number },
    colors : [String],
    imageCover : {
        type : String,
    },
    images : [String],
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    subCategories : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "SubCategory",

        }
    ],
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    },
    ratingsAverage: {
        type: Number,
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },

} , {timestamps : true  ,  toJSON: { virtuals: true },
toObject: { virtuals: true }});

export default mongoose.model('Product' , Product)