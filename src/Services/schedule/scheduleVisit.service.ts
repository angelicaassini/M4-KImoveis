import AppDataSource from "../../data-source";
import Property from "../../entities/property.entity";
import Schedule from "../../entities/schedule.entity";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";
import {
  IScheduleRequest,
  IScheduleResponse,
} from "../../interfaces/schedules";

const createScheduleService = async (scheduleData: IScheduleRequest) => {
  const userRepo = AppDataSource.getRepository(User);
  const scheduleRepo = AppDataSource.getRepository(Schedule);
  const propertiesRepo = AppDataSource.getRepository(Property);

  const foundUser = await userRepo.findOneBy({
    id: scheduleData.userId,
  });
  if (!foundUser) {
    throw new AppError("This user doesn't exist", 404);
  }

  const foundProperty = await propertiesRepo.findOneBy({
    id: scheduleData.propertyId,
  });
  if (!foundProperty) {
    throw new AppError("This property doesn't exist", 404);
  }

  const scheduledVisits = await userRepo
    .createQueryBuilder("users")
    .leftJoinAndSelect("users.schedules", "alias_schedules")
    .where("users.id = :id_user", { id_user: scheduleData.userId })
    .andWhere("alias_schedules.date = :schedule_date", {
      schedule_date: scheduleData.date,
    })
    .andWhere("alias_schedules.hour = :schedule_hour", {
      schedule_hour: scheduleData.hour,
    })
    .getOne();

  if (scheduledVisits) {
    throw new AppError("This schedule already exists", 409);
  }

  const scheduledVisitsByProperty = await propertiesRepo
    .createQueryBuilder("properties")
    .leftJoinAndSelect("properties.schedules", "alias_schedules")
    .where("properties.id = :id_property", {
      id_property: scheduleData.propertyId,
    })
    .andWhere("alias_schedules.date = :schedule_date", {
      schedule_date: scheduleData.date,
    })
    .andWhere("alias_schedules.hour = :schedule_hour", {
      schedule_hour: scheduleData.hour,
    })
    .getOne();

  if (scheduledVisitsByProperty) {
    throw new AppError("This schedule already exists", 409);
  }

  await scheduleRepo.save({
    date: scheduleData.date,
    hour: scheduleData.hour,
    property: foundProperty,
    user: foundUser,
  });
};

export default createScheduleService;
