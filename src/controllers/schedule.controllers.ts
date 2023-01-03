import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules";
import listAllSchedulesService from "../Services/schedule/listAllSchedules.service";
import createScheduleService from "../Services/schedule/scheduleVisit.service";

const listAllSchedulesController = async (req: Request, res: Response) => {
  const propertyId: string = req.params.id;
  const data = await listAllSchedulesService(propertyId);
  return res.status(200).json(data);
};

const createScheduleController = async (req: Request, res: Response) => {
  const scheduleData: IScheduleRequest = req.body;
  scheduleData.userId = req.user.id;
  await createScheduleService(scheduleData);
  return res.status(201).json({
    message: "Schedule created",
  });
};

export { createScheduleController, listAllSchedulesController };
