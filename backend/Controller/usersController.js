import userModel from '../Models/userModel.js'

export const fetchProfile = async (req, res) => {
  const userID = req.params.userID
  try {
    const user = await userModel.findById(userID).select('-password').select('-confirmPassword');
    if (!user) {
      return res.status(404).json({
        message: "User Not found"
      })
    } else {
      return res.status(200).json({
        user
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error

    })
  }
}



// Admin Profile Page Edit
export const editProfile = async (req, res) => {
  const userID = req.params.userID
  try {

    const updateFeilds = req.body;
    console.log(updateFeilds);

    const existingUser = await userModel.findById(userID)
    console.log("existingUser:", existingUser);


    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // check if profile picture url in parameter or not
    if (!updateFeilds.profile || !updateFeilds.profile.profile_picture_url) {
      updateFeilds.profile_picture_url = `https://api.dicebear.com/8.x/initials/svg?seed=${updateFeilds.firstName+' '+updateFeilds.lastName}`
    }
    console.log("updateFeilds", updateFeilds);

    const user = await userModel.findByIdAndUpdate(userID, {
      profile:{
        firstName:updateFeilds.firstName,
        lastName:updateFeilds.lastName,
        birthdate:updateFeilds.DOB,
        profile_picture_url:updateFeilds.profile_picture_url,
        gender:updateFeilds.gender,
        location:{
          address:updateFeilds.location?.address,
          city:updateFeilds.location?.city,
          zipcode:updateFeilds.location?.zipcode,
          country:updateFeilds.location?.country,
        }
      }
    }, { new: true })

    console.log("updated user:",user);
    if (user) {
      res.status(200).json({ message: "Profile update successfully", user })
    } else {
      res.status(200).json({ message: "Profile update unsuccessfully", })
    }


  } catch (error) {
    console.log(error);
    // return res.status(500).json({
    //   message: "Internal Server Error",
    //   error:error
    // })
  }
}