import AppDataSource from "../../data-source";
import Category from "../../entities/category.entity";
import { ICategoryResponse } from "../../interfaces/categories";

const listAllCategoriesService = async (): Promise<ICategoryResponse[]> => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const categories = await categoryRepo.find();

  await categoryRepo.save(categories);

  return categories;
};
export default listAllCategoriesService;
