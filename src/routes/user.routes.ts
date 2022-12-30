import { Router } from "express";
import {
  createUserController,
  listAllUsersController,
  updateUserController,
  deleteUserController,
} from "../controllers/users.controllers";
import ensureAuthMW from "../middlewares/ensureAuthMW";
import ensureDataIsValidMW from "../middlewares/ensureDataIsValidMW";
import ensureDataNotValidMW from "../middlewares/ensureDataIsNotValidMW";
import ensureEmailNotExistsMW from "../middlewares/ensureEmailNotExistsMW";
import ensureIdIsValidMW from "../middlewares/ensureIdIsValidMW";
import ensureIsAdminMW from "../middlewares/ensureIsAdminMW";
import ensureOwnerOrAdminMW from "../middlewares/ensureOwnerOrAdminMW";
import { userUpdateRequestSchema } from "../schemas/user.schema";

const userRoutes = Router();

userRoutes.post("/users", ensureEmailNotExistsMW, createUserController);
userRoutes.get("/users", ensureAuthMW, ensureIsAdminMW, listAllUsersController);
userRoutes.patch(
  "/users/:id",
  ensureAuthMW,
  ensureOwnerOrAdminMW,
  ensureIdIsValidMW,
  ensureDataNotValidMW,
  ensureDataIsValidMW(userUpdateRequestSchema),
  updateUserController
);
userRoutes.delete(
  "/users/:id",
  ensureAuthMW,
  ensureIsAdminMW,
  ensureIdIsValidMW,
  deleteUserController
);

export default userRoutes;
