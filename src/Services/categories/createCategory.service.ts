import AppDataSource from "../../data-source";
import Category from "../../entities/category.entity";
import {
  ICategoryRequest,
  ICategoryResponse,
} from "../../interfaces/categories";
import {
  categoryRequestSchema,
  categoryResponseSchema,
} from "../../schemas/category.schema";

const createCategoryService = async (
  categoryData: ICategoryRequest
): Promise<ICategoryResponse> => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const validatedCategoryData = await categoryRequestSchema.validate(
    categoryData
  );
  const createdCategory = categoryRepo.create(validatedCategoryData);
  await categoryRepo.save(createdCategory);

  const categoryResponseValidated = await categoryResponseSchema.validate(
    createdCategory,
    {
      stripUnknown: true,
      abortEarly: false,
    }
  );
  return categoryResponseValidated;
};
export default createCategoryService;
