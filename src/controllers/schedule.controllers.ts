import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules";
import listAllSchedulesService from "../Services/schedule/listAllSchedules.service";
import scheduleVisitService from "../Services/schedule/scheduleVisit.service";

const listAllSchedulesController = async (req: Request, res: Response) => {
  const propertyId: string = req.params.id;
  const data = await listAllSchedulesService(propertyId);
  return res.status(201).json(data);
};

const scheduleVisitController = async (req: Request, res: Response) => {
  const scheduleData: IScheduleRequest = req.body;
  const userId: string = req.user.id;
  const data = await scheduleVisitService(userId, scheduleData);
  return res.status(201).json(data);
};

export { scheduleVisitController, listAllSchedulesController };
