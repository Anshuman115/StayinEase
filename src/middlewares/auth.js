import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "@/utils/errorHandler";
import { getSession } from "next-auth/react";

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const session = await getSession({ req });

  // console.log("session", session);

  if (!session) {
    return next(new ErrorHandler("Login First to access this resource", 401));
  }

  req.user = session.user;
  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`
        ),
        403
      );
    }
    next();
  };
};

export { isAuthenticatedUser, authorizeRoles };
