import express from "express";
import { adminLogoutController, adminTokenSaveController, fetchTokenController } from "../../Controller/Admin/adminAuth.js";
const router = express.Router();

router.post('/auth', adminTokenSaveController)
router.get('/auth/fetch/:userId', fetchTokenController)
router.get('/logout',adminLogoutController)

export default router