import asyncWarper from '../middleware/async.js';
import jwt from 'jsonwebtoken';
import brandSchema from '../schema/brandSchema.js';


const CreateBrand = asyncWarper(async(req , res)=> {

const cookie = req.cookies.access_token;
if(!cookie) return res.status(400).json({message:'Pleas Login First..'});  
const token = jwt.verify(cookie , process.env.SECRET_KEY)
if(!token.isAdmin) return res.status(400).json({message : 'Admin only'});



const {name} = req.body;
if(!name) return res.status(400).json({message : "Pleas Enter Name first"});
const Data = await brandSchema.findOne({name});
if(Data) return res.status(400).json({message : "Brand Alredy exisit"});
    const createNewBrand = new brandSchema({
        name
    })
    await createNewBrand.save();
    res.status(201).json({message : 'Brand Created Sucessfuly' , info : [createNewBrand]});

})

const getBrands = asyncWarper(async(req , res)=> {
    const Data =await brandSchema.find({} , {__v : 0 , createdAt:0 , updatedAt:0 , _id:0})
    return res.status(200).json(Data);
})

const updateBrand = asyncWarper(async(req , res)=> {
    const cookie = req.cookies.access_token;
if(!cookie) return res.status(400).json({message:'Pleas Login First..'});  
const token = jwt.verify(cookie , process.env.SECRET_KEY)
if(!token.isAdmin) return res.status(400).json({message : 'Admin only'});
    const id = req.params.id;
    const {name} = req.body;
    if(!id) return res.status(400).json({message : "Pleas Enter id first"})
    const Data = await brandSchema.findById(id);
   if(!Data) return res.status(404).json({message : "Brand not found"});
    if(!name) return res.status(404).json({message : 'Pleas Enter name'});
    const newBrand = await brandSchema.findByIdAndUpdate(id, {name});
    return res.status(200).json({message : "Changed Sucessfuly" , info :[newBrand]});
})

const deleteBrand = asyncWarper(async(req , res)=> {
    const cookie = req.cookies.access_token;
if(!cookie) return res.status(400).json({message:'Pleas Login First..'});  
const token = jwt.verify(cookie , process.env.SECRET_KEY)
if(!token.isAdmin) return res.status(400).json({message : 'Admin only'});
const id = req.params.id;
if(!id) return res.status(404).json({message : "Pleas Enter Id"});
const delete_brand = await brandSchema.findByIdAndDelete(id);
if(!delete_brand) return res.status(404).json({message : 'Brand not found'});
res.status(200).json({message : `${delete_brand} Deleted Sucessfuly`});
})

const getBrand = asyncWarper(async(req , res)=> {
    const cookie = req.cookies.access_token;
if(!cookie) return res.status(400).json({message:'Pleas Login First..'});  
const token = jwt.verify(cookie , process.env.SECRET_KEY)
if(!token.isAdmin) return res.status(400).json({message : 'Admin only'});
const id = req.params.id;
if(!id) return res.status(404).json({message : 'Pleas enter Id'});
const Data = await brandSchema.findOne({_id : id});
if(!Data) return res.status(404).json({message : 'Brand Not FOund'});
res.status(200).json({message : 'Found' , info : [Data]});
})

export {
    CreateBrand,
    getBrands,
    updateBrand,
    deleteBrand,
    getBrand

}