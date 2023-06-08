import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import {
  allRooms,
  newRoom,
  getSingleRoom,
} from "@/controllers/roomControllers";

import onError from "../../../middlewares/errors";

const handler = nc({ onError });
import { isAuthenticatedUser, authorizeRoles } from "@/middlewares/auth";

dbConnect();

handler.get(allRooms);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).post(newRoom);

export default handler;
