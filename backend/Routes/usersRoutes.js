import express from 'express'
import { editProfile, fetchProfile } from '../Controller/usersController.js';
const router = express.Router();

router.get('/profile/:userID',fetchProfile)
router.post('/profile/edit/:userID',editProfile)


export default router