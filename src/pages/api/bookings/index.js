import { createRouter } from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { newBooking } from "../../../controllers/bookingController";
import onError from "../../../middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/auth";

const handler = createRouter();

dbConnect();

handler.use(isAuthenticatedUser).post(newBooking);

export default handler.handler({ onError });
