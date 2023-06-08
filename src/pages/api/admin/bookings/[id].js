import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";
import onError from "../../../../middlewares/errors";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import { deleteBookings } from "@/controllers/bookingController";

const handler = nc({ onError });

dbConnect();

handler
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .delete(deleteBookings);

export default handler;
