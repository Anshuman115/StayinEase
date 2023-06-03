import ErrorHandler from "@/utils/errorHandler";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import Booking from "@/models/booking";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

//Probable Methods ->
// momentIst = moment().tz("Asia/Kolkata");
// submissionTime: moment(response.updatedAt)
//           .utcOffset('+5:30')
//           .format('DD/MM/YYYY h:mm:ss A'),

// create new bookings => /api/bookings
const newBooking = catchAsyncErrors(async (req, res) => {
  const timeDifference = moment().utcOffset() / 60;
  console.log(timeDifference);

  let {
    room,
    checkInDate: cin,
    checkOutDate: cout,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  //took a lot of time to fix -- finally reading docs helped
  console.log(cin, cout);
  const checkInDate = moment(cin).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const checkOutDate = moment(cout).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  console.log(checkInDate);
  console.log(checkOutDate);

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

  // console.log(bookings);

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
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: "room",
      select: "name pricePerNight images",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    sucess: true,
    bookings,
  });
});

//get booking details => /api/bookings/:id
const getBookingDetails = catchAsyncErrors(async (req, res) => {
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: "room",
      select: "name pricePerNight images",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    booking,
  });
});

export {
  newBooking,
  checkRoomBookingAvailability,
  checkBookedDatesOfRoom,
  myBookings,
  getBookingDetails,
};
