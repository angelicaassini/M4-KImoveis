import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import AppError from "../errors/AppError";

const ensureDataIsValidMW =
  (Schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await Schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.body = validatedData;
    } catch (error) {
      
      throw new AppError("Email or password incorrect", 404);
    }
    return next();
  };
export default ensureDataIsValidMW;
