import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import AppError from "../errors/AppError";

const ensureEmailNotExistsMW = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User);
  const foundUser = await userRepo.findOneBy({ email: req.body.email });

  if (foundUser) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};
export default ensureEmailNotExistsMW;
