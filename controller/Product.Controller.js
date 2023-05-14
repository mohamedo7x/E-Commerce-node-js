import ProdcutSchema from '../schema/Product.Schema.js';
import jwt from 'jsonwebtoken';
import asyncWarper from '../middleware/async.js';


const crateProduct = asyncWarper(async (req , res)=> {

    const cookie = req.cookies.access_token;
    if(!cookie) return res.status(400).json({message:'Pleas Login First..'});  
    const token = jwt.verify(cookie , process.env.SECRET_KEY)
    if(!token.isAdmin) return res.status(400).json({message : 'Admin only'});
    const {title , quantity , sold , price , description , category , imageCover , ratingsAverage , ratingsQuantity} = req.body;
    if(!(title || quantity || sold || price || description || category || imageCover || ratingsAverage || ratingsQuantity)) 
    return res.status(404).json ({message : "enter Data first"});
    const Data = await ProdcutSchema.findOne({title});
    if(Data) return res.status(400).json({message : "Product Exisit"});
    const new_Product = new ProdcutSchema({
        title , quantity , sold , price , description , category , imageCover , ratingsAverage , ratingsQuantity
    })
    await new_Product.save();
    res.status(201).json({message : "Product Create Sucessfuly" , info : [new_Product]});


    
})
const updateProduct = asyncWarper(async (req , res)=> {
    const cookie = req.cookies.access_token;
    if(!cookie) return res.status(400).json({message:'Pleas Login First..'});  
    const token = jwt.verify(cookie , process.env.SECRET_KEY)
    if(!token.isAdmin) return res.status(400).json({message : 'Admin only'});
})

const getAllProduct = asyncWarper(async (req , res)=> {
    
})

const getProduct = asyncWarper(async (req , res)=> {
    
})
const deleteProduct = asyncWarper(async (req , res)=> {
    
})


export {
    crateProduct,
    updateProduct,
    getAllProduct,
    getProduct,
    deleteProduct
}