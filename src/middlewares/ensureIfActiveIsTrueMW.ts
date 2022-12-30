import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import AppError from "../errors/AppError";

const ensureIfActiveIsTrue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  if (!req.body.isActive) {
    throw new AppError("This user is not active", 400);
  }
  return next();
};
export default ensureIfActiveIsTrue;
