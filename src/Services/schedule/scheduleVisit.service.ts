import AppDataSource from "../../data-source";
import Schedule from "../../entities/schedule.entity";
import { User } from "../../entities/user.entity";
import { IScheduleRequest } from "../../interfaces/schedules";

const scheduleVisitService = async (
  userId: string,
  scheduleData: IScheduleRequest
) => {
  const userRepo = AppDataSource.getRepository(User);
  
  const scheduleRepo = AppDataSource.getRepository(Schedule);
  const scheduleEntity = scheduleRepo.create(scheduleData)
  const schedule = await scheduleRepo.save(scheduleEntity)

  const scheduledVisits = await userRepo
    .createQueryBuilder("users")
    .innerJoinAndSelect("users.schedules", "alias_schedules")
    .innerJoinAndSelect("alias_schedules.property", "alias_property")
    .where("user.id = :id_user", { id_user: userId })
    .where("property_id != :id_property", {
      id_property: scheduleData.propertyId,
    })
    .where("scheduleDate.date != schedule_date", {
      schedule_date: scheduleData.date,
    })
    .where("scheduleDate.hour != schedule-hour", {
      schedule_hour: scheduleData.hour,
    })
    .getOne();

  return scheduledVisits;
};
export default scheduleVisitService;
