import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import onError from "../../../middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/auth";
import { createRoomReview } from "@/controllers/roomControllers";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(createRoomReview);

export default handler;
