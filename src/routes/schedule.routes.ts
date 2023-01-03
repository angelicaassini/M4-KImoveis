import { Router } from "express";
import {
  createScheduleController,
  listAllSchedulesController,
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
  createScheduleController
);
scheduleRoutes.get(
  "/schedules/properties/:id",
  ensureAuthMW,
  ensureIsAdminMW,
  listAllSchedulesController
);

export default scheduleRoutes;
