import AppDataSource from "../../data-source";
import Category from "../../entities/category.entity";
import AppError from "../../errors/AppError";
import { ICategoryResponse } from "../../interfaces/categories";

const listAllPropertiesFromCategoryByIdService = async (
  id: string
): Promise<ICategoryResponse> => {
  const categoryRepo = AppDataSource.getRepository(Category);

  const filtredCategory = await categoryRepo.findOne({
    where: { id },
    relations: {
      properties: true,
    },
  });

  if (!filtredCategory) {
    throw new AppError("This category doesn't exist", 404);
  }

  return filtredCategory;
};
export default listAllPropertiesFromCategoryByIdService;
