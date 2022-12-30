import { Router } from "express";
import { createPropertyController, listAllPropertiesController } from "../controllers/property.controllers";
import ensureAdressNotExistsMW from "../middlewares/ensureAdressNotExistsMW";
import ensureDataIsValidMW from "../middlewares/ensureDataIsValidMW";
import ensureIsAdminMW from "../middlewares/ensureIsAdminMW";
import { propertyRequestSchema } from "../schemas/addressAndProperty.schema";

const propertyRoutes = Router() 

propertyRoutes.post("/properties", ensureAdressNotExistsMW, ensureIsAdminMW, ensureDataIsValidMW(propertyRequestSchema), createPropertyController)
propertyRoutes.get("/properties", listAllPropertiesController)