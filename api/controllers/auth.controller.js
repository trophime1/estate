import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });


  try {
    await newUser.save();
    res.status(201).json('user created successfully')
  } catch (error) {
    next(error)
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email })
    if (!validUser)
      return next(errorHandler(404, 'user not found'))

    const isValidPassword = bcryptjs.compareSync(password, validUser.password)
    if (!isValidPassword)
      return next(errorHandler(401, 'Worng password'))
    const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest)

  }
  catch (error) {
    next(error)
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = Jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
}
export const signOut = (req, res, next) => {
  try {
    res.clearCookie('access_token')
    res.status(200).json('user has been logged out')
  } catch (error) {
    next(error)
  }

}
export const forgetPassword = async (req, res) => {

  try {
    const user = await User.findOne({ email: req.body.email })
    console.log("em", user)
    if (!user) {
      res.json({ error: "there is no user with this email" })
    }
    const userInfo = {
      token: Jwt.sign({ id: user.id }, "viewhome"),
      email: user.email
    }
    return res.status(200).json({
      message: 'Password reset mail Sent Successfully',
      token: userInfo
    })
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}
export const resetPassword = async (req, res) => {
  try {
    const token = req.params.token
    if (token) {
      const data = await Jwt.verify(token, "viewhome")
      console.log("data",data)
      const userInfos = await User.findById( data.id )
      if (!userInfos) {
        return res.status(404).json({ error: "user not found" })
      }
      const salt = await bcryptjs.genSaltSync(10);
      const newHashedPassword = await bcryptjs.hash(req.body.password, salt)
      const user = await User.findById(userInfos._id)
      console.log("use",user.password)
      console.log("req",req.body)
      user.password = newHashedPassword
      await user.save()
      res.status('201').json({ message: 'Password reset successfully', user })
    }
  } catch (error) {
    return res.status(404).json({ error: error.message })
    
  }
}



