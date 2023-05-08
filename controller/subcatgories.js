import asyncWrapper from '../middleware/async.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import categoires from '../schema/CategoriesShchema.js';
import SubcatSchema from '../schema/SubcatSchema.js';
import CategoriesShchema from '../schema/CategoriesShchema.js';
dotenv.config();

const createSub = asyncWrapper(async (req, res) => {
    /* Check If User Exisit and privilage */
    let token_h = req.cookies.access_token;
    if (!token_h) return res.status(400).json({
        message: "Pleas Loign"
    });
    let token = jwt.verify(token_h, process.env.SECRET_KEY);
    if (!token.isAdmin) return res.status(400).json({
        message: "this method for ADMIN ONLY "
    })
    const {
        name,
        cat
    } = req.body;

    if (!name || !cat) return req.status(400).json({
        message: "Enter name OF subcat OR categoires"
    });
    let Sub_cat_Data = await SubcatSchema.findOne({
        name
    });
    let cat_Data = await categoires.findOne({
        name: cat
    });
    if (Sub_cat_Data) return res.status(400).json({
        message: "Sub Cat already exisit"
    });
    if (!cat_Data) return res.status(400).json({
        message: "categoire Not found"
    })



    const createSubCat = await new SubcatSchema({
        name,
        category: cat_Data._id
    })

    await createSubCat.save();

    res.status(201).json({
        message: "Sub categoire Created",
        info: [createSubCat]
    })

})

const showallSub = asyncWrapper(async (req, res) => {

    let Data =await SubcatSchema.find({} , {_id:0 , __v:0 , createdAt:0 , updatedAt:0});
    res.status(200).json({message : "All Subcategories" , info : [Data]   })

})

const showSub = asyncWrapper(async (req, res) => {
    let {name} = req.body;
    if(!name) return res.status(400).json({message : "Enter Name First"});
    let Data_subCat = await SubcatSchema.findOne({name});
    if(!Data_subCat) return res.status(404).json({message : "Subcategoire Not Found!"});
    res.status(200).json({message : `FOUND ${name}`  , info : [Data_subCat]});
})



const deleteSub = asyncWrapper(async (req, res) => {
  /* Check If User Exisit and privilage */
  let token_h = req.cookies.access_token;
  if (!token_h) return res.status(400).json({
      message: "Pleas Loign"
  });
  let token = jwt.verify(token_h, process.env.SECRET_KEY);
  if (!token.isAdmin) return res.status(400).json({
      message: "this method for ADMIN ONLY "
  })
  let {name} = req.params;
  name = name.toString();
  if(!name) return res.status(404).json({message : "Enter Name first"});
  let Data =await SubcatSchema.findOne({name});
  if(!Data) return res.status(404).json({message : "SubCat notFound"});
  const Dlete_subCat = await SubcatSchema.deleteOne({name});
  res.status(200).json({
    message : `SubCategorie was name ${name} Deleted Sucessfuly`
  })
})

const updateSub = asyncWrapper(async (req, res) => {
  /* Check If User Exisit and privilage */
    let token_h = req.cookies.access_token;
    if (!token_h) return res.status(400).json({
        message: "Pleas Loign"
    });
    let token = jwt.verify(token_h, process.env.SECRET_KEY);
    if (!token.isAdmin) return res.status(400).json({
        message: "this method for ADMIN ONLY "
    })
    let old_name = req.params.name;
    old_name = old_name.toString();
    let {name} = req.body;
    if(!old_name || !name) return res.status(404).json({message : "Pleas Enter old_name & name "});
    
    const Data_sub = await SubcatSchema.findOne({name : old_name});
    const Data_2sub = await SubcatSchema.findOne({name : name});
    if(!Data_sub) return res.status(404).json({message : "SubCat Dosent Exisit "});
    if(Data_2sub) return res.status(400).json({ message : "Name already Taken "})
    let Up_subcat = await SubcatSchema.updateOne({
        name : old_name
    } , {name : name});
    res.status(200).json({message : `Subcat ${old_name} Updataed to ${name}` , info:[Up_subcat]})
})

export {
    createSub,
    showallSub,
    showSub,
    deleteSub,
    updateSub
}