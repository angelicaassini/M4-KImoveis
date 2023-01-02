import { Router } from "express";
import {
  createPropertyController,
  listAllPropertiesController,
} from "../controllers/property.controllers";
import ensureAdressNotExistsMW from "../middlewares/ensureAdressNotExistsMW";
import ensureAuthMW from "../middlewares/ensureAuthMW";
import ensureDataIsValidMW from "../middlewares/ensureDataIsValidMW";
import ensureIsAdminMW from "../middlewares/ensureIsAdminMW";
import { propertyRequestSchema } from "../schemas/addressAndProperty.schema";

const propertyRoutes = Router();

propertyRoutes.post(
  "/properties",
  ensureAuthMW,
  ensureIsAdminMW,
  ensureAdressNotExistsMW,
  ensureDataIsValidMW(propertyRequestSchema),
  createPropertyController
);
propertyRoutes.get("/properties", listAllPropertiesController);

export default propertyRoutes;
