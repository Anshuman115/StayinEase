import { createRouter } from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { checkBookedDatesOfRoom } from "../../../controllers/bookingController";
import onError from "../../../middlewares/errors";

const handler = createRouter();

dbConnect();

handler.get(checkBookedDatesOfRoom);

export default handler.handler({ onError });
