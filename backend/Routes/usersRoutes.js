import express from 'express'
import { editBio, editProfile, editProfileImage, editSocialMedia, fetchProfile, profileImageController } from '../Controller/usersController.js';
import multer from 'multer';
const router = express.Router();


// Dashboard Pannel Route
router.get('/profile/:userID', fetchProfile)
router.post('/profile/edit/:userID', editProfile)
router.post('/profileImage/edit/:userID', editProfileImage)
router.post('/bio/edit/:userID', editBio)
router.post('/social-media/edit/:userID', editSocialMedia)


// image upload
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage }).single('file')

router.post('/update/profileImage', profileImageController)


export default router