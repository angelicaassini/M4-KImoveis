import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import AppError from "../errors/AppError";

const ensureOwnerOrAdminMW = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 
  if (req.params.id !== req.user.id && !req.user.isAdm) {
    throw new AppError("Its not owner or admin", 401);
  }
  return next();
};
export default ensureOwnerOrAdminMW;
