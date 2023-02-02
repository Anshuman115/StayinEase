import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import {
  allRooms,
  newRoom,
  getSingleRoom,
} from "@/controllers/roomControllers";

import onError from "../../../middlewares/erros";

const handler = nc({ onError });

dbConnect();

handler.get(allRooms);
handler.post(newRoom);

export default handler;
