import express from 'express'
import { CreateConversation, createGroupController, getGroupMessages, sendMessageInGroup } from '../Controller/groupController.js'
const router = express.Router();


router.post('/create-group', createGroupController);
router.post('/message', sendMessageInGroup);
router.post('/conversation',CreateConversation)
router.get('/message/:id',getGroupMessages)

export default router