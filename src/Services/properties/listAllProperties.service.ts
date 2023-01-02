import AppDataSource from "../../data-source";
import Property from "../../entities/property.entity";
import { IPropertyResponse } from "../../interfaces/properties";

const listAllPropertiesService = async (): Promise<IPropertyResponse[]> => {
  const propertyRepo = AppDataSource.getRepository(Property);
  const properties = await propertyRepo.find({
    relations: {
      address: true,
    },
  });

  await propertyRepo.save(properties);

  return properties;
};
export default listAllPropertiesService;
