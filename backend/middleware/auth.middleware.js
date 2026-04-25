import { asyncHandler } from "../utility/asyncHandler.utility.js";
import { ErrorHandler } from "../utility/errorHandler.utility.js";
import jwt from "jsonwebtoken";

export const isAuhenticated = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.token || req.heahers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    return next(new ErrorHandler("Invalied token", 400));
  }

  const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = tokenData;
  next();
});
