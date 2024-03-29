import Room from "../models/room";
import Booking from "@/models/booking";
import ErrorHandler from "@/utils/errorHandler";

import catchAsyncErrors from "@/middlewares/catchAsyncErrors";

import cloudinary from "cloudinary";

import APIFeatures from "@/utils/apiFeatures";

const allRooms = catchAsyncErrors(async (req, res) => {
  const resPerPage = 4;
  const roomsCount = await Room.countDocuments();

  const apiFeatures = new APIFeatures(Room.find(), req.query);
  apiFeatures.search();
  apiFeatures.filter();

  let rooms = await apiFeatures.query;

  let filteredRoomsCount = rooms.length;

  apiFeatures.pagination(resPerPage);
  rooms = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    roomsCount,
    resPerPage,
    filteredRoomsCount,
    rooms,
  });
});

// create new room => /api/rooms
const newRoom = catchAsyncErrors(async (req, res) => {
  const images = req.body.images;
  let imagesLink = [];
  // console.log(req.user);
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "Stayin/Rooms",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  // req.body.user = req.user._id;

  const room = await Room.create(req.body);

  res.status(200).json({
    success: true,
    room,
  });
});

// create a room => /api/rooms/:id
const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    // return res.status(400).json({
    //   success: false,
    //   error: "room not found ",
    // });
    return next(new ErrorHandler("room not found ", 404));
  }
  res.status(200).json({
    success: true,
    room,
  });
});

// update room details => /api/rooms/:id
const updateRoom = catchAsyncErrors(async (req, res) => {
  let room = await Room.findById(req.query.id);
  if (!room) {
    // return res.status(400).json({
    //   success: false,
    //   error: "room not found ",
    // });
    return next(new ErrorHandler("room not found ", 404));
  }

  if (req.body.images) {
    //delete images
    for (let i = 0; i < room.images.length; i++) {
      await cloudinary.v2.uploader.destroy(room.images[i].public_id);
    }
  }

  const images = req.body.images;
  let imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "Stayin/Rooms",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    room,
  });
});

// update room details => /api/rooms/:id
const deleteRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    // return res.status(400).json({
    //   success: false,
    //   error: "room not found ",
    // });
    return next(new ErrorHandler("room not found ", 404));
  }

  //delete images
  for (let i = 0; i < room.images.length; i++) {
    await cloudinary.v2.uploader.destroy(room.images[i].public_id);
  }

  await room.deleteOne();

  res.status(200).json({
    success: true,
    message: "room is deleted succesfully",
  });
});

// Create new review of room => /api/reviews
const createRoomReview = catchAsyncErrors(async (req, res) => {
  const { rating, comment, roomId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  // console.log(review);
  const room = await Room.findById(roomId);
  // console.log(room);
  const isReviewed = room.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  // console.log(isReviewed);
  if (isReviewed) {
    room.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
    // console.log(room);
  }
  room.rating =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length;

  await room.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "review is added succesfully",
  });
});

// Check Review available or not => /api/reviews/check_review_availability
const checkReviewAvailability = catchAsyncErrors(async (req, res) => {
  const { roomId } = req.query;
  const bookings = await Booking.find({ user: req.user._id, room: roomId });

  let isReviewAvaialable = false;
  if (bookings.length > 0) isReviewAvaialable = true;

  res.status(200).json({
    success: true,
    isReviewAvaialable,
  });
});

// Check all rooms - ADMIN => /api/admin/rooms
const allAdminRooms = catchAsyncErrors(async (req, res) => {
  const rooms = await Room.find();

  res.status(200).json({
    success: true,
    rooms,
  });
});

export {
  allRooms,
  newRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
  createRoomReview,
  checkReviewAvailability,
  allAdminRooms,
};
