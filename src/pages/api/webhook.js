import { createRouter } from "next-connect";
import dbConnect from "../../config/dbConnect";

import { webhookCheckout } from "@/controllers/paymentController";

import onError from "../../middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/auth";

const handler = createRouter();

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(webhookCheckout);

export default handler.handler({ onError });
