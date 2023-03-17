import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import { registerUser } from "@/controllers/authController";

import onError from "../../../middlewares/erros";

const handler = nc({ onError });

dbConnect();

handler.post(registerUser);

export default handler;
