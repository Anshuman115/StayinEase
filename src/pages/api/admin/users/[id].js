import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";
import onError from "../../../../middlewares/errors";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import {
  deleteUser,
  getUserDetails,
  updateUserDetails,
} from "@/controllers/authController";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getUserDetails);
handler
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .put(updateUserDetails);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteUser);

export default handler;
