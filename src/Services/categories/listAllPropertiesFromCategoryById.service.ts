import AppDataSource from "../../data-source";
import Category from "../../entities/category.entity";
import { ICategoryResponse } from "../../interfaces/categories";

const listAllPropertiesFromCategoryByIdService = async (
  categoryId: string
): Promise<ICategoryResponse[]> => {
  const categoryRepo = AppDataSource.getRepository(Category);

  const filtredCategories = await categoryRepo
    .createQueryBuilder("categories")
    .where("category.id = :id_category", { id_category: categoryId })
    .getMany();

  return filtredCategories;
};
export default listAllPropertiesFromCategoryByIdService;
