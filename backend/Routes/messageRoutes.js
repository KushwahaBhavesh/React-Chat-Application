import express from 'express';
import { messageController } from '../Controller/messageController.js';
const router = express.Router();


router.post('/send/:id',messageController)

export default router