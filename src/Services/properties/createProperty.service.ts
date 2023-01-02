import AppDataSource from "../../data-source";
import Property from "../../entities/property.entity";
import {
  IPropertyRequest,
  IPropertyResponse,
} from "../../interfaces/properties";
import {
  propertyRequestSchema,
  propertyResponseSchema,
} from "../../schemas/addressAndProperty.schema";

const createPropertyService = async (
  propertyData: IPropertyRequest
): Promise<IPropertyResponse> => {
  const propertyRepo = AppDataSource.getRepository(Property);
  const validatedProperty = await propertyRequestSchema.validate(propertyData);
  const createdProperty = propertyRepo.create(validatedProperty);
  await propertyRepo.save(createdProperty);
  console.log("createdProperty:", createdProperty);
  const propertyResponseValidated = await propertyResponseSchema.validate(
    createdProperty
  );
  console.log("propertyResponseValidated:", propertyResponseValidated);
  return propertyResponseValidated;
};
export default createPropertyService;
