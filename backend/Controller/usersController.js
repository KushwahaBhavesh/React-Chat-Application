import { upload } from "../Routes/usersRoutes.js";
import userModel from "../Models/userModel.js";
import cloudinary from "../Utils/CloudinaryConfig.js";
import { response } from "express";

export const fetchProfile = async (req, res) => {
  const userID = req.params.userID;
  try {
    const user = await userModel
      .findById(userID)
      .select("-password")
      .select("-confirmPassword");
    if (!user) {
      return res.status(404).json({
        message: "User Not found",
      });
    } else {
      return res.status(200).json({
        user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

// Admin Profile Page Edit
export const editProfile = async (req, res) => {
  const userID = req.params.userID;
  try {
    const updateFeilds = req.body;

    const response = await userModel.updateOne({ _id: userID }, {
      $set: {
        "profile.firstName": updateFeilds.firstName,
        "profile.lastName": updateFeilds.lastName,
        "profile.birthdate": updateFeilds.DOB,
        "profile.gender": updateFeilds.gender,
        "profile.location.address": updateFeilds.location?.address,
        "profile.location.city": updateFeilds.location?.city,
        "profile.location.zipcode": updateFeilds.location?.zipcode,
        "profile.location.country": updateFeilds.location?.country,
      },
    });
    console.log(response);

    if (response.matchedCount === 1) {
      const user = await userModel.findById({ _id: userID })
      if (!user) return res.status(404).json({ message: "user not ound" })
      return res.status(200).json({ message: "profile update successfully", user })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};


// upload profile [picture in cloudnary]
export const profileImageController = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.json({ message: "Error in uploading file", err });

    const file = req.file.path;
    console.log(file);
    const response = await cloudinary.uploader.upload(file, {
      upload_preset: "webChatProfile",
    });
    const { secure_url } = response;
    return res.status(200).json({
      message: "image upload succssfully",
      secure_url,
    });
  });
};



// Profile image update
export const editProfileImage = async (req, res) => {
  const userID = req.params.userID;
  console.log(userID);
  try {
    const updateFeilds = req.body;

    const result = await userModel.updateOne(
      { _id: userID },
      {
        $set: { "profile.profile_picture_url": updateFeilds.secure_url },
      }
    );
    console.log(result);

    if (result.modifiedCount === 1) {
      const updatedData = await userModel.findById({ _id: userID });
      if (!updatedData)
        return res.status(404).json({ message: "User Not found..." });
      return res.status(200).json({
        message: "image update successfully",
        updatedData,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export const editBio = async (req, res) => {
  const userID = req.params.userID;
  const { bioString } = req.body;

  try {
    console.log(bioString);
    const response = await userModel.updateOne(
      { _id: userID },
      { $set: { "profile.bio": bioString } }
    );

    if (response.matchedCount === 1) {
      const user = await userModel.findById({ _id: userID })
      if (!user) return res.status(404).json({ message: "user not ound" })
      const { bio } = user.profile
      return res.status(200).json({ message: "profile update successfully", bio })
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};




// Social media Controller
export const editSocialMedia = async (req, res) => {
  const userID = req.params.userID
  const { account } = req.body;
  try {
    const result = await userModel.updateOne({ _id: userID }, {
      $set: {
        "profile.social_media": account
      }
    })
    if (result.modifiedCount === 1) {
      const user = await userModel.findById({ _id: userID })
      if (!user) return res.status(404).json({ message: "user not ound" })
      const social_media = user.profile.social_media
      return res.status(200).json({ message: "social-media update successfully", social_media })
    }

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error
    })
  }
}