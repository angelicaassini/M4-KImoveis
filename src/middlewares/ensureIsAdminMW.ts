import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const ensureIsAdminMW = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdm) {
    throw new AppError("User is not admin", 403);
  }
  return next();
};
export default ensureIsAdminMW;
