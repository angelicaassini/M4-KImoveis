import { Router } from "express";
import { loginUserController } from "../controllers/login.controller";
import ensureDataIsValidMW from "../middlewares/ensureDataIsValidMW";
import { loginSchema } from "../schemas/login.schema";

const loginRoutes = Router();

loginRoutes.post(
  "/login",
  ensureDataIsValidMW(loginSchema),
  loginUserController
);

export default loginRoutes;
