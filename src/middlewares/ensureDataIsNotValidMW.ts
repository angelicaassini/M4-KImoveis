import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const ensureDataNotValidMW = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body;
  if ("isActive" in userData || "id" in userData || "isAdm" in userData) {
    throw new AppError("It is not able to update: isActive, id or isAdm", 401);
  }
  return next();
};
export default ensureDataNotValidMW;
