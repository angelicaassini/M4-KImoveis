import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import createCategoryService from "../Services/categories/createCategory.service";
import listAllCategoriesService from "../Services/categories/listAllCategories.service";
import listAllPropertiesFromCategoryByIdService from "../Services/categories/listAllPropertiesFromCategoryById.service";

const createCategoryController = async (req: Request, res: Response) => {
  const categoryData: ICategoryRequest = req.body;
  const data = await createCategoryService(categoryData);
  return res.status(201).json(data);
};

const listAllCategoriesController = async (req: Request, res: Response) => {
  const data = await listAllCategoriesService();
  return res.status(200).json(data);
};

const listAllPropertiesFromCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  const categoryId: string = req.params.id;

  const data = await listAllPropertiesFromCategoryByIdService(categoryId);
  return res.status(200).json(data);
};

export {
  createCategoryController,
  listAllCategoriesController,
  listAllPropertiesFromCategoryByIdController,
};
