import ErrorHandler from "@/utils/errorHandler";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import Booking from "@/models/booking";

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

export { newBooking, checkRoomBookingAvailability };
