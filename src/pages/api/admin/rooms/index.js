import { createRouter } from "next-connect";
import dbConnect from "../../../../config/dbConnect";
import { allAdminRooms, newRoom } from "@/controllers/roomControllers";
import onError from "../../../../middlewares/errors";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";

const handler = createRouter();

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminRooms);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).post(newRoom);

export default handler.handler({ onError });
