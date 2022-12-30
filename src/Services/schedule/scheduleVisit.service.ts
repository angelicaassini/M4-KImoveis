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

  const scheduledVisits = await userRepo
    .createQueryBuilder("users")
    .innerJoinAndSelect("users.schedules", "alias_schedules")
    .innerJoinAndSelect("schedules.property", "alias_property")
    .where("user.id = :id_user", { id_user: userId })
    .where("property_id = :id_property", { id_property: scheduleData })
    .where("scheduleDate.date !== ScheduleDate", {
      ScheduleDate: Schedule,
    })
    .where("scheduleDate.hour !== ScheduleHour", {
      ScheduleHour: Schedule,
    })
    .getOne();

  return scheduledVisits;
};
export default scheduleVisitService;
