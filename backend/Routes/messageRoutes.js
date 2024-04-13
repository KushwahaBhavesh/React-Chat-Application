import express from 'express';
import { CreateConversation, FetchConversationController, SendMessageController, fetchMessages, fetchUserController, } from '../Controller/messageController.js';
const router = express.Router();


router.post('/message/send', SendMessageController)
router.get('/search/user/', fetchUserController)
router.post('/CreateConversation', CreateConversation)
router.post('/message/fetch', fetchMessages)
router.get('/conversation/:userId', FetchConversationController)

export default router