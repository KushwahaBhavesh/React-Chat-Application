import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { encryptConfirmPassword, encryptPassword } from "../Utils/authHandler.js";
import tokensModel from "../Models/authVerifyToken.js";
import sendEmail from "../Utils/SendEmailConfig.js";


export const ChecknameController = async (req, res) => {
  try {
    const { name } = req.query
    console.log(name);
    const response = await userModel.findOne({ name })
    if (response) {
      return res.status(200).json({ message: "name already exist" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error in checkname Controller",
      error,
    });
  }
}

export const RegisterController = async (req, res) => {

  try {
    const { name, phone, email, password, confirmPassword, profile_picture_url } = req.body;

    console.log({ name, phone, email, password, confirmPassword, profile_picture_url }
    );

    if (!name) {
      return res.json({
        message: "Name is required...",
      });
    }
    if (!email) {
      return res.json({
        message: "email is required...",
      });
    }
    if (!phone) {
      return res.json({
        message: "phone is required...",
      });
    }
    if (!password) {
      return res.json({
        message: "password must containe 8 character",
      });
    }
    if (!confirmPassword) {
      return res.json({
        message: "confirmPassowrd must be match",
      });
    }

    // Verifying existing user
    const existingEmail = await userModel.findOne({ email });
    const existingPhone = await userModel.findOne({ phone });


    if (existingEmail) {
      return res.status(200).json({
        success: false,
        message: "Email Already Registered",
      });
    } else if (existingPhone) {
      return res.status(200).json({
        success: false,
        message: "phone number already registered",
      });
    }

    // encrypting Password
    const encryptedPassword = await encryptPassword(password);
    const encryptedConfirmPassword = await encryptConfirmPassword(
      confirmPassword
    );

    // inserting user Details in database
    const user = await new userModel({
      name,
      phone,
      email,
      password: encryptedPassword,
      confirmPassword: encryptedConfirmPassword,
      profile: {
        profile_picture_url: profile_picture_url
      },
    }).save();


    const jwtToken = jwt.sign({ userId: user._id }, process.env.EMAIL_TOKEN_SECRET_KEY, { expiresIn: "5m" });
    const emailVerifyToken = await new tokensModel({ userId: user._id, token: jwtToken }).save()
    const url = `http://localhost:5173/auth/${user.id}/verify/${emailVerifyToken.token}`;

    await sendEmail(user?.email, "verify Account", url)

    return res.status(200).json({
      success: true,
      message: "An Email sent to your account please verify",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in Signup Controller",
      error,
    });
  }
};


// Verify Email
export const verifyAccountController = async (req, res) => {
  const userID = req.params.id
  console.log(userID);
  try {
    const user = await userModel.findOne({ _id: userID })
    if (!user) return res.status(404).json({ message: "User Not Found" });

    const token = await tokensModel.findOne({ userId: user.id, token: req.params.token })

    console.log(token);
    if (!token) return res.status(404).json({ message: "Invalid link" });

    const response = await userModel.updateOne({ _id: userID }, { "verified": true });
    if (response.matchedCount === 1) {
      // await token.remove();
    }

    return res.status(200).json({ message: "Email verified successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in verify controller",
      error,
    });
  }
}


// /////////////////////
// Login Controller
///////////////////////

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({
        message: "Email is requied....",
      });
    }
    if (!password) {
      return res.json({
        message: "Password is requied....",
      });
    }

    let user = await userModel.findOne({ email });
    if (user) {
      let isPassword = await bcrypt.compare(password, user.password);
      if (isPassword) {

        if (!user?.verified) {
          let token = await tokensModel.findOne({ userId: user._id });

          if (!token) {

            const jwtToken = jwt.sign({ userId: user._id }, process.env.EMAIL_TOKEN_SECRET_KEY, { expiresIn: "5m" });
            const emailVerifyToken = await new tokensModel({ userId: user._id, token: jwtToken }).save()
            const url = `http://localhost:5173/auth/${user.id}/verify/${emailVerifyToken.token}`;
            await sendEmail(user?.email, "verify Account", url)
            return res.status(200).json({ message: "An Email sent to your account please verify" })
          }

          const url = `http://localhost:5173/auth/${user.id}/verify/${token.token}`;
          await sendEmail(user?.email, "verify Account", url)
          return res.status(200).json({ message: "An Email sent to your account please verify" })
        }

        // Token Generation
        const accessToken = jwt.sign(
          {
            userId: user.id,
          },
          process.env.USER_SECRET_KEY,
          { expiresIn: "5m" }
        );

        const refreshToken = jwt.sign(
          { userId: user.id },
          process.env.USER_REFRESH_SECRET_KEY,
          { expiresIn: "30d" }
        );
        res.cookie("accessToken", accessToken, { maxAge: 60000 });
        res.cookie("refreshToken", refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });

        return res.status(200).json({
          success: true,
          message: "Login Successful",
          user,
          accessToken,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Invalid Password",
        });
      }
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Email Not Registered" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};




// Logout Controller
export const LogOutController = (req, res) => {
  try {
    return res
      .clearCookie("refreshToken")
      .clearCookie("accessToken")
      .status(200)
      .json({ success: true, msg: "logout Successfully 😁😁 🍀" });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
}
