import { createRouter } from "next-connect";
import dbConnect from "../../../../config/dbConnect";
import { resetPassword } from "../../../../controllers/authController";
import onError from "../../../../middlewares/errors";

const handler = createRouter();

dbConnect();

handler.put(resetPassword);

export default handler.handler({ onError });
