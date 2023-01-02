import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Property from "../entities/property.entity";
import AppError from "../errors/AppError";

const ensureAdressNotExistsMW = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const propertyRepo = AppDataSource.getRepository(Property);
  const findProperty = await propertyRepo.findOneBy({
    address: req.body.address,
  });

  if (findProperty) {
    throw new AppError("This address already exists", 409);
  }
  return next();
};
export default ensureAdressNotExistsMW;
