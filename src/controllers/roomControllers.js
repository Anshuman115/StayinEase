import Room from "../models/room";
import ErrorHandler from "@/utils/errorHandler";

import catchAsyncErrors from "@/middlewares/catchAsyncErrors";

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
  await Room.remove();
  res.status(200).json({
    success: true,
    message: "room is deleted succesfully",
  });
});

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
