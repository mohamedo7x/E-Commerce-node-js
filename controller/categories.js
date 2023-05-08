import CategoriesShchema from "../schema/CategoriesShchema.js";
import user from '../schema/userSchema.js';
import asyncWrapper from '../middleware/async.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();


const createCat = asyncWrapper(async (req, res) => {

    /* Check If Token exisit and if he is admin */
    let token = req.cookies.access_token;
    const data =  jwt.verify(token, process.env.SECRET_KEY);
    if (!token) return res.status(400).json({
        message: 'Pleas login'
    });
    if (!data.isAdmin) return res.status(400).json({
        message: "Admin only"
    });

    /* Check iF there same cat */
    const {
        name,
        img
    } = req.body; // there no img wright now .... fix it later
    const Data_cat = await CategoriesShchema.findOne({
        name
    }, {
        __v: 0,
    });


    if (Data_cat) return res.status(400).json({
        message: "Categorie alredy exisit ",
        Data_cat
    });

    /* Create Cat */

    const create =  new CategoriesShchema({
        name,
        img
    } , {__v : 0 });
    await create.save();
    res.status(201).json({
        message: "Categorie has been created",
        info: [
            create
        ]
    })

});

const updateCat = asyncWrapper(async (req, res) => {
    /* Check If User Exisit and privilage */
    let token_h = req.cookies.access_token;
    if (!token_h) return res.status(400).json({
        message: "Pleas Loign"
    });
    let token =  jwt.verify(token_h, process.env.SECRET_KEY);
    if (!token.isAdmin) return res.status(400).json({
        message: "this method for ADMIN ONLY "
    })



    let cat = req.params.name;
    cat = cat.toString();

    /* Secarch In Cat First  */
    let Data = await CategoriesShchema.findOne({
        name: cat
    });

    if (!Data) return res.status(404).json({
        message: "Categories Not Found"
    });

    /* Change Name  */
    const DataName = req.body.name;
    let UP_cat = await CategoriesShchema.updateOne({
        name: cat
    }, {
        name: DataName
    })

    res.status(200).json({
        message: "Categorie Name Changed"
    });


});

const deleteCat = asyncWrapper(async (req, res) => {
    let token_h = req.cookies.access_token;
    if (!token_h) return res.status(400).json({
        message: "Pleas Loign"
    });
    let token =  jwt.verify(token_h, process.env.SECRET_KEY);
    if (!token.isAdmin) return res.status(400).json({
        message: "this method for ADMIN ONLY "
    })

    let cat = req.params.name;
    cat = cat.toString();
    if(!cat) return res.status(400).json({message : "Enter Name Of Categories"})
     /* Secarch In Cat First  */
     let Data = await CategoriesShchema.findOne({
        name: cat
    });

    if (!Data) return res.status(404).json({
        message: "Categories Not Found"
    });

    const delteCat =await CategoriesShchema.deleteOne({name : cat});

        res.status(200).json({message: 'Categories deleted'})

});

const showCat = asyncWrapper(async (req, res) => {
    /* Check If User Exisit and privilage */
    let token_h = req.cookies.access_token;
    if (!token_h) return res.status(400).json({
        message: "Pleas Loign"
    });
    let token =  jwt.verify(token_h, process.env.SECRET_KEY);
    if (!token.isAdmin) return res.status(400).json({
        message: "this method for ADMIN ONLY "
    })
    const name = req.body.name;
    if(!name) return res.status(400).json({message : "Enter name first."})
    const Data = await CategoriesShchema.findOne({
        name : name
    });
    if(!Data) return res.status(404).json({message : "Categorie not found" });

    res.status(200).json({
        ALERT: "Categorie",
        info:Data
        
    })

});

const showCatAll = asyncWrapper(async(req , res)=> {
    const All_cat =await CategoriesShchema.find({} , {createdAt : 0 , updatedAt:0 , __v:0 , _id:0});
    res.status(200).json({All_cat})
})
export {
    showCat,
    showCatAll,
    createCat,
    updateCat,
    deleteCat
};