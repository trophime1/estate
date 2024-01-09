import express from "express";
import { forgetPassword, google, resetPassword, signOut, signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();
router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);
router.get('/signout', signOut);
router.post("/forgotPassword",forgetPassword)
router.post("/resetPassword/:token",resetPassword)
export default router;



