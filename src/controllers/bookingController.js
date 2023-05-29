import ErrorHandler from "@/utils/errorHandler";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import Booking from "@/models/booking";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

// create new bookings => /api/bookings
const newBooking = catchAsyncErrors(async (req, res) => {
  // console.log(req);
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  });

  res.status(200).json({
    succes: true,
    booking,
  });
});

//check room booking availability - /api/bookings/check
const checkRoomBookingAvailability = catchAsyncErrors(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query;

  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const booking = await Booking.find({
    room: roomId,
    //and is mongodb operator to check multiple operator
    $and: [
      {
        checkInDate: {
          //lte is less than
          $lte: checkOutDate,
        },
        checkOutDate: {
          //greater than - gte
          $gte: checkInDate,
        },
      },
    ],
  });

  //check if there is any booking available
  let isAvailable;

  if (booking && booking.length === 0) {
    isAvailable = true;
  } else {
    // console.log("false");
    isAvailable = false;
  }

  res.status(200).json({
    success: true,
    isAvailable,
  });
});

//check room dates of a room - /api/bookings/check_booked_dates
const checkBookedDatesOfRoom = catchAsyncErrors(async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ room: roomId });

  let bookedDates = [];

  const timeDifference = moment().utcOffset() / 60;

  bookings.forEach((booking) => {
    const checkInDate = moment(booking.checkInDate).add(
      timeDifference,
      "hours"
    );
    const checkOutDate = moment(booking.checkOutDate).add(
      timeDifference,
      "hours"
    );

    const range = moment.range(moment(checkInDate), moment(checkOutDate));

    const dates = Array.from(range.by("day"));
    bookedDates = bookedDates.concat(dates);
  });

  res.status(200).json({
    success: true,
    bookedDates,
  });
});

//get all booking of current user => /api/bookings/me
const myBookings = catchAsyncErrors(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id });

  res.status(200).json({
    sucess: true,
    bookings,
  });
});

export {
  newBooking,
  checkRoomBookingAvailability,
  checkBookedDatesOfRoom,
  myBookings,
};
