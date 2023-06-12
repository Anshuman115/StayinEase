import mongoose from "mongoose";
// import timeZone from "mongoose-timezone";
import moment from "moment-timezone";

// //Need to import these before using as ref
import { roomSchema } from "./room";
// import { userSchema } from "./user";
var Room = mongoose.model("Room", roomSchema);
// var User = mongoose.model("User", userSchema);

// import Room from "./room";
// import User from "./user";

const timeDifference = moment().utcOffset() / 60;
// console.log(timeDifference);
// var utc = moment(new Date()).utc().add(timeDifference, "hours");
var utc = moment(new Date());
utc.tz("Asia/Kolkata").format();
// utc.setHours(utc.getHours() + 5);
// utc.setMinutes(utc.getMinutes() + 30);

// console.log(utc);

// var current = new Date();
// const timeStamp = new Date(
//   Date.UTC(
//     current.getFullYear(),
//     current.getMonth(),
//     current.getDate(),
//     current.getHours(),
//     current.getMinutes(),
//     current.getSeconds(),
//     current.getMilliseconds()
//   )
// );

// console.log(timeStamp);

const bookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Room,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  daysOfStay: {
    type: Number,
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
    default: utc,
  },
  createdAt: {
    type: Date,
    default: utc,
  },
});

// bookingSchema.pre("save", function (next) {
//   // Convert the createdAt field to the desired time zone before saving
//   if (this.createdAt) {
//     const timeZone = "Asia/Kolkata"; // Replace with your desired time zone
//     this.createdAt = moment(this.createdAt).tz(timeZone).toDate();
//     this.paidAt = moment(this.paidAt).tz(timeZone).toDate();
//     this.checkInDate = moment(this.checkInDate).tz(timeZone).toDate();
//     this.checkOutDate = moment(this.checkOutDate).tz(timeZone).toDate();
//   }

//   next();
// });

// bookingSchema.plugin(timeZone);

export default mongoose.models?.Booking ||
  mongoose.model("Booking", bookingSchema);
