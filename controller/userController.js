import asyncWrapper from "../middleware/async.js";
import User from "../schema/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import {
    v4 as uuidv4
} from 'uuid';
import {
    uploadSingleImage
} from '../middleware/multer.js'
import sharp from "sharp";


const uploadUserImage = uploadSingleImage("imgProfile")


const resizeImage = asyncWrapper(async (req, res, next) => {
        if (req.file) {
            const filename = `user--${uuidv4}--${Date.now()}.jpeg`;
            await sharp(req.file.buffer)
                .resize(600, 600)
                .toFormat('jpeg')
                .jpeg({
                    quality: 95
                })
                .toFile(`uploads/users/${filename}`)
        }

        //Save IMAGE
        const api = process.env.API;
        const basePath = `${req.protocol}://${req.get('host')}${filename}`
        req.body.imgProfile = basePath;

        next();
    }

)

const showAll = asyncWrapper(async (req, res) => {
    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 10;
    let skip = (page - 1) * limit;
    const Data = await User.find({}, {
        password: 0,
        __v: 0,
    }).limit(limit).skip(skip);
    res.status(200).json({
        page,
        limit,
        Data
    });
})
const user = async (req, res) => {

    try {
        const token = req.cookies.access_token;
        if (token === undefined) return await res.status(400).json({
            message: "Pleas login"
        });
        const info = jwt.verify(token, process.env.SECRET_KEY);
        let Data = await User.findOne({
            _id: info.id
        }, {
            password: 0,
            __v: 0,
            isAdmin: 0,
            _id: 0
        });

        await res.status(200).json({
            information: Data
        })
    } catch (error) {
        if (error.message) await res.clearCookie("access_token", {
            sameSite: "none",
            secure: true
        });
        res.status(500).json(error);

    }

};

const register = asyncWrapper(async (req, res) => {
    /* Check if user already exists */
    let user = await User.findOne({
        email: req.body.email
    });
    if (user)
        return res.status(400).json({
            message: "user already exists...",
        });

    /* Hashing Password */
    const password = await bcrypt.hash(req.body.password, 10);

    // Create new user
    const c_user = await new User({
        firtst_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        password: password,
    });
    await c_user.save();

    const {
        firtst_name,
        last_name,
        email
    } = await c_user;

    await res.status(201).json({
        msg: "User has been create Successfully...",
        info: {
            firtst_name,
            last_name,
            email,
        },
    });
});

const login = asyncWrapper(async (req, res) => {

    const cookie = req.cookies.access_token;
    if (!cookie) return res.status(400).json({
        message: 'Pleas Login First..'
    });




    const {
        email,
        password
    } = req.body;
    let user = await User.findOne({
        email
    });
    /* Search about User */
    if (!user)
        return res.status(400).json({
            message: "Invalid email or password",
        });
    /* Compare Password */
    const Check_password = bcrypt.compareSync(password, user.password);
    const SECRET = process.env.SECRET_KEY;
    if (!Check_password)
        res.status(400).json({
            message: "Invalid email or password",
        });

    const {
        _id,
        isAdmin,
        email_active
    } = user;

    const token = await jwt.sign({
            id: _id,
            active: email_active,
            isAdmin,

        },
        SECRET, {
            expiresIn: "1d"
        }
    );

    await res.cookie("access_token", token, {
        httpOnly: true
    }).status(200).json({
        message: "Login Successfuly",
        token
    });
});

const logout = asyncWrapper(async (req, res) => {
    if (req.headers.cookie === undefined)
        return res.status(400).json({
            message: "Pleas login first"
        });
    await res
        .clearCookie("access_token", {
            sameSite: "none",
            secure: true
        })
        .status(200)
        .json({
            message: "Logout Successfuly",
        });
});


const updateUser = async (req, res) => {

};

const changePassword = asyncWrapper(async (req, res) => {


});

export {
    register,
    login,
    logout,
    user,
    updateUser,
    changePassword,
    resizeImage,
    uploadUserImage,
    showAll
};