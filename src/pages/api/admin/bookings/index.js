import { createRouter } from "next-connect";
import dbConnect from "../../../../config/dbConnect";
import onError from "../../../../middlewares/errors";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import { allAdminBookings } from "@/controllers/bookingController";

const handler = createRouter();

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminBookings);

export default handler.handler({ onError });
