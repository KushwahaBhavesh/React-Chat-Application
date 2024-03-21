import express from "express";
import { LoginController, RegisterController } from "../Controller/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();



// Routes
router.post('/register', RegisterController)
router.post('/', LoginController)
router.get('/protected',verifyToken,async(req,res)=>{
  return res.status(201).json({message:"Protected route accessed"});
})


export default router