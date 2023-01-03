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
  console.log("&&&&&&&&&&foundproperty", foundProperty);

  const scheduledVisits = await propertyRepo
    .createQueryBuilder("properties")
    .leftJoinAndSelect("properties.schedules", "alias_schedules")
    .where("properties.id = :id_property", { id_property: propertyId })
    .getMany();

  return scheduledVisits;
};
export default listAllSchedulesService;
