import { createRouter } from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { checkRoomBookingAvailability } from "../../../controllers/bookingController";
import onError from "../../../middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/auth";

const handler = createRouter();

dbConnect();

handler.get(checkRoomBookingAvailability);

export default handler.handler({ onError });
