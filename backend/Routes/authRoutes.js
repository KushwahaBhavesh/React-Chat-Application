import express from "express";
import { ChecknameController, LogOutController, LoginController, RegisterController, verifyAccountController } from "../Controller/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();



// Routes
router.get('/checkname', ChecknameController)
router.post('/register', RegisterController)
router.post('/', LoginController)
router.get("/:id/verify/:token/", verifyAccountController)

router.get('/protected', verifyToken, async (req, res) => {
  return res.status(201).json({ message: "Protected route accessed" });
})

router.get('/user/chat', verifyToken, async (req, res) => {
  return res.status(201).json({ message: "user chat accessed" })
})

router.get('/logout',LogOutController)


export default router