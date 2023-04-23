import User from "../models/user";

import cloudinary from "cloudinary";

import ErrorHandler from "@/utils/errorHandler";

import catchAsyncErrors from "@/middlewares/catchAsyncErrors";

import APIFeatures from "@/utils/apiFeatures";
import { getSession } from "next-auth/react";

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

export { registerUser, currentUserProfile, updateUserProfile };
