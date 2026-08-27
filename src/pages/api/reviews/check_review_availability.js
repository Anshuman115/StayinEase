import { createRouter } from "next-connect";
import dbConnect from "../../../config/dbConnect";

import onError from "../../../middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/auth";
import { checkReviewAvailability } from "@/controllers/roomControllers";

const handler = createRouter();

dbConnect();

handler.use(isAuthenticatedUser).get(checkReviewAvailability);

export default handler.handler({ onError });
