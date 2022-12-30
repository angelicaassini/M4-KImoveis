import { Router } from "express";
import {
  listAllSchedulesController,
  scheduleVisitController,
} from "../controllers/schedule.controllers";
import ensureAuthMW from "../middlewares/ensureAuthMW";
import ensureDataIsValidMW from "../middlewares/ensureDataIsValidMW";
import { ensureHourAndDateAreValid } from "../middlewares/ensureHourAndDateAreValidMW";
import ensureIsAdminMW from "../middlewares/ensureIsAdminMW";
import { scheduleRequestSchema } from "../schemas/schedule.schema";

const scheduleRoutes = Router();
scheduleRoutes.post(
  "/schedules",
  ensureAuthMW,
  ensureHourAndDateAreValid,
  ensureDataIsValidMW(scheduleRequestSchema),
  scheduleVisitController
);
scheduleRoutes.get(
  "/schedules/properties/:propertyId",
  ensureIsAdminMW,
  listAllSchedulesController
);

export default scheduleRoutes;
