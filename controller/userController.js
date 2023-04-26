import asyncWrapper from '../middleware/async.js';
import User from '../schema/userSchema.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

 const user = asyncWrapper(async(req,res)=> {
       
});


const register = asyncWrapper(async(req,res)=> {    
  /* Check if user already exists */
let user = await User.findOne({email:req.body.email});
if(user) return res.status(400).json({
error : "user already exists..."
});

/* Hashing Password */
const password =await bcrypt.hash(req.body.password  , 10);


// Create new user
const c_user =await new User({
    firtst_name : req.body.firstname, 
    last_name : req.body.lastname,
    email : req.body.email,
    password : password
});
await c_user.save();

    const {firtst_name , last_name , email } =await c_user;

    await res.status(201).json({
        msg: "User has been create Successfully...",
        info : {
            firtst_name,
            last_name,
            email
        }
    })

});


const login = asyncWrapper(async(req,res)=> {

    if(req.headers.cookie !== "" && req.headers.cookie)
     return res.status(400).json({
        message : "You already logedin"
     });
       const {email , password} = req.body;
    let user = await User.findOne({email});
    /* Search about User */
    if(!user) return res.status(400).json({
         message: 'Invalid email or password'
    });
    /* Compare Password */
    const Check_password = bcrypt.compareSync(password , user.password);
    const SECRET = process.env.SECRET_KEY;
    if(!Check_password) res.status(400).json({
        message : "Invalid email or password"
    })

   const token = await jwt.sign({
       id :  user._id,
       isAdmin : user.isAdmin

    } , SECRET , {expiresIn : "1d"});

        await res.cookie("access_token" , token , {httpOnly:true}).status(200).json({
            message : "Login Successfuly"
        })

        console.log();
});

const logout = asyncWrapper(async(req,res)=> {
    console.log(req.headers.cookie)
       if(req.headers.cookie === undefined) return res.status(400).json({ message : "You already logedout"});
      await res.clearCookie("access_token").status(200).json({
        message : "Logout Successfuly"
      });
});


const updateUser = asyncWrapper(async(req,res)=> {
       
});

export {register , login , logout , user , updateUser};