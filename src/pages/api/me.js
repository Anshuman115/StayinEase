import { createRouter } from "next-connect";
import dbConnect from "../../config/dbConnect";

import { currentUserProfile } from "@/controllers/authController";

import onError from "../../middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/auth";

const handler = createRouter();

dbConnect();

handler.use(isAuthenticatedUser).get(currentUserProfile);

export default handler.handler({ onError });
