import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firtst_name : {
        type:String,
        require:true,
        min:3,
        max:15,
    },
    last_name : {
        type:String,
        require:true,
        min:3,
        max:15,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    email_active : {
        type:Boolean,
        default : false
    },
    password : {
        type:String,
        requier:true,
        min :8 ,
        max : 300,
       
    },
    photo : {
        type:String,
        default : ""
    },
    street: {
        type: String,
        default: "",
        unique:false
    },
    apartement: {
        type: String,
        default: "",
        unique:false
    },
    city: {
        type: String,
        default : "",
        unique:false
    },
    zip: {
        type: Number,
        default: "",
        unique:false
    },
    country: {
        type: String,
        default : "",
        unique:false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
 
})

userSchema.virtual("id").get(() => {
    return this._id
});


export default mongoose.model('User' , userSchema);