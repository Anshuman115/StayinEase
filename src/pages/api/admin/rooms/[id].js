import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";
import onError from "../../../../middlewares/errors";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import { deleteRoom, updateRoom } from "@/controllers/roomControllers";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateRoom);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteRoom);

export default handler;
