import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import { encryptConfirmPassword, encryptPassword } from "../Utils/authHandler.js";

export const RegisterController = async (req, res) => {
  try {
    const { name, phone, email, password, confirmPassword, profile_picture_url } = req.body;

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
        profile_picture_url:profile_picture_url 
      },
    }).save();

    return res.status(200).json({
      success: true,
      message: "User Register Successfully",
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
        // Token Generation
        const accessToken = jwt.sign(
          {
            userId: user.id,
          },
          process.env.USER_SECRET_KEY,
          { expiresIn: "1m" }
        );

        const refreshToken = jwt.sign(
          { userId: user.id },
          process.env.USER_REFRESH_SECRET_KEY,
          { expiresIn: "5m" }
        );
        res.cookie("accessToken", accessToken, { maxAge: 60000 });
        res.cookie("refreshToken", refreshToken, {
          maxAge: 300000,
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
