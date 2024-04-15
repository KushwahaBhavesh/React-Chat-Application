import express from 'express';
import { CreateConversation, FetchConversationController, SendMessageController, fetchMessages, fetchUserController, } from '../Controller/messageController.js';
const router = express.Router();
import {verifyToken} from '../middleware/authMiddleware.js'


router.post('/message/send', verifyToken, SendMessageController)
router.get('/search/user/', fetchUserController)
router.post('/CreateConversation', CreateConversation)
router.post('/message/fetch', fetchMessages)
router.get('/conversation/:userId',verifyToken,FetchConversationController)

export default router