import { createRouter } from "next-connect";
import dbConnect from "../../../config/dbConnect";

import { allRooms } from "@/controllers/roomControllers";

import onError from "../../../middlewares/errors";

const handler = createRouter();

dbConnect();

handler.get(allRooms);

export default handler.handler({ onError });
