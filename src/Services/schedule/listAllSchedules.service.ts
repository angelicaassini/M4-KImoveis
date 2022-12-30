import AppDataSource from "../../data-source";
import Property from "../../entities/property.entity";

const listAllSchedulesService = async (propertyId:string) => {
  const propertyRepo = AppDataSource.getRepository(Property);

  const scheduledVisits = await propertyRepo.createQueryBuilder('properties')
    .innerJoinAndSelect("properties. schedules_user_property", "alias_ schedules_user_property")
    .where("property_id = :id_property", { id_property: propertyId })
    .getMany();

  return scheduledVisits;
};
export default listAllSchedulesService;
