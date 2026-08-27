import { createRouter } from "next-connect";
import dbConnect from "../../../config/dbConnect";

import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from "@/controllers/roomControllers";

import onError from "../../../middlewares/errors";
import { isAuthenticatedUser, authorizeRoles } from "@/middlewares/auth";

const handler = createRouter();

dbConnect();

handler.get(getSingleRoom);

export default handler.handler({ onError });
