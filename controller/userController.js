import asyncWrapper from "../middleware/async.js";
import User from "../schema/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const user  = async (req, res) => {
  
    try {
        const token = req.cookies.access_token;
        console.log("HERE : "+req.cookies.access_token);
    
        if(token === undefined ) return await res.status(400).json({ message : "Pleas login"});
        const info = jwt.verify(token, process.env.SECRET_KEY);
    
        await res.status(200).json({
            information : info
        })        
    } catch (error) {
        res.status(500).json(error); 
    } 
   

};

const register = asyncWrapper(async (req, res) => {
  /* Check if user already exists */    
  let user = await User.findOne({ email: req.body.email });
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

  const { firtst_name, last_name, email } = await c_user;

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
  if (req.headers.cookie !== "" && req.headers.cookie)
    return res.status(400).json({
      message: "You already logedin",
    });
  const { email, password } = req.body;
  let user = await User.findOne({ email });
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

    const {firtst_name , last_name , photo , _id , street , apartment , city , zip , email_active , isAdmin} = user;

  const token = await jwt.sign(
    {
      id:_id,
      firstname : firtst_name,
      lastname : last_name,
      photo ,
      street ,
      apartment,
      city,
      zip,
      email_active,
      isAdmin,
    },
    SECRET,
    { expiresIn: "1d" }
  );

  await res.cookie("access_token", token, { httpOnly: true }).status(200).json({
    message: "Login Successfuly",
  });
});

const logout = asyncWrapper(async (req, res) => {
  if (req.headers.cookie === undefined)
    return res.status(400).json({ message: "Pleas login first" });
  await res
    .clearCookie("access_token", { sameSite: "none", secure: true })
    .status(200)
    .json({
      message: "Logout Successfuly",
    });
});

const updateUser = asyncWrapper(async (req, res) => {});

export { register, login, logout, user, updateUser };
