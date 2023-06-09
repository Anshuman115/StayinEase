import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";
import onError from "../../../../middlewares/errors";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import { getAllAdminUsers } from "@/controllers/authController";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getAllAdminUsers);

export default handler;
