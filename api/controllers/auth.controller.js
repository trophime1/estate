import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils.js/error.js";
import Jwt  from "jsonwebtoken";
export const signup= async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = await bcryptjs.hashSync(password,10);
    const newUser = new User ({username,email,password:hashedPassword});

try{
    await newUser.save();
res.status(201).json('user created successfully')
} catch (error) {
   next(error)
} 
};

export const signin = async ( req, res, next) => {
    const {email,password} = req.body;
    try {
        const validUser = await User.findOne({email})
        if (!validUser)
            return next(errorHandler(404, 'user not found'))  
            
            const isValidPassword = bcryptjs.compareSync(password, validUser.password)
            if (!isValidPassword)
            return next(errorHandler(401, 'Worng password'))
        const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const {password:pass , ...rest }= validUser._doc;
        res
        .cookie('access_token', token,{httpOnly:true})
        .status(200)
        .json(rest)

    }
    catch (error) {
        next(error)
    }
}
