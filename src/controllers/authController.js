import User from "../models/user";

import cloudinary from "cloudinary";

import ErrorHandler from "@/utils/errorHandler";

import catchAsyncErrors from "@/middlewares/catchAsyncErrors";

import APIFeatures from "@/utils/apiFeatures";
import { getSession } from "next-auth/react";
import absoluteUrl from "next-absolute-url";
import sendEmail from "@/utils/sendEmail";

//Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const registerUser = catchAsyncErrors(async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "Stayin/Avatars",
    width: 150,
    crop: "thumb",
    gravity: "face",
    radius: "max",
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Account registered successfully",
  });
});

// current user profile => /api/me
const currentUserProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user profile => /api/me/update
const updateUserProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    if (req.body.avatar) {
      const image_id = user.avatar.public_id;
      //delete user prev image/avatar
      await cloudinary.v2.uploader.destroy(image_id);
      const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "Stayin/Avatars",
        width: 150,
        crop: "thumb",
        gravity: "face",
        radius: "max",
      });
      user.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
  }

  await user.save();

  res.status(200).json({
    success: true,
  });
});

//Forgot password => /api/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res) => {
  const user = await User.findOne(req.body.email);
  if (!user) {
    return next(new ErrorHandler("User Not Registered", 404));
  }

  //get origin
  const { origin } = absoluteUrl(req);

  //Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //Create reset password url
  const resetUrl = `${origin}/password/reset/${resetToken}`;

  //message
  const message = `Your Password reset url is as follow: \n\n ${resetUrl} \n\n
  If you have not requested this email then ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "StayinEase Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to : ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new ErrorHandler(error.message, 500));
  }
});

export { registerUser, currentUserProfile, updateUserProfile, forgotPassword };
