import AppDataSource from "../../data-source";
import Property from "../../entities/property.entity";
import Schedule from "../../entities/schedule.entity";
import AppError from "../../errors/AppError";

const listAllSchedulesService = async (propertyId: string) => {
  const propertyRepo = AppDataSource.getRepository(Property);
  const scheduleRepo = AppDataSource.getRepository(Schedule);

  const foundProperty = await propertyRepo.findOneBy({ id: propertyId });
  if (!foundProperty) {
    throw new AppError("This property doesn't exist", 404);
  }

  const scheduledVisits = await propertyRepo
    .createQueryBuilder("properties")
    .leftJoinAndSelect("properties.schedules", "alias_schedules")
    .innerJoinAndSelect("alias_schedules.user", "alias_user")
    .innerJoinAndSelect("properties.address", "alias_address")
    .innerJoinAndSelect("properties.category", "alias_category")
    .where("properties.id = :id_property", { id_property: propertyId })
    .getOne();

  return scheduledVisits;
};
export default listAllSchedulesService;
