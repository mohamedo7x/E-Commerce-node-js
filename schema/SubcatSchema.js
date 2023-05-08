import mongoose from "mongoose";

const subcat = mongoose.Schema({

    name: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "The id of the category must be required"]
    },
   

} ,  {timestamps:true})

export default mongoose.model('SubCategory', subcat)