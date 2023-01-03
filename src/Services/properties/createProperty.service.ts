import AppDataSource from "../../data-source";
import Address from "../../entities/address.entity";
import Category from "../../entities/category.entity";
import Property from "../../entities/property.entity";
import AppError from "../../errors/AppError";
import {
  IPropertyRequest,
  IPropertyResponse,
} from "../../interfaces/properties";

const createPropertyService = async (
  propertyData: IPropertyRequest
): Promise<IPropertyResponse> => {
  const propertyRepo = AppDataSource.getRepository(Property);
  const categoryRepo = AppDataSource.getRepository(Category);
  const addressRepo = AppDataSource.getRepository(Address);

  if (propertyData.address.state.length > 2) {
    throw new AppError("This state must be 2 characters", 400);
  }

  if (propertyData.address.zipCode.length > 8) {
    throw new AppError("This zipCode must be 8 characters", 400);
  }

  const createdAddress = addressRepo.create(propertyData.address);
  await addressRepo.save(createdAddress);

  const foundCategory = await categoryRepo.findOneBy({
    id: propertyData.categoryId,
  });

  if (!foundCategory) {
    throw new AppError("This category doesn't exist", 404);
  }

  const createdProperty = propertyRepo.create({
    value: propertyData.value,
    size: propertyData.size,
    address: createdAddress,
    category: foundCategory,
  });
  await propertyRepo.save(createdProperty);

  return createdProperty;
};
export default createPropertyService;
