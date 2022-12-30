import { Router } from "express";
import { createCategoryController, listAllCategoriesController, listAllPropertiesFromCategoryByIdController } from "../controllers/category.controllers";
import ensureCategoryNotExistsMW from "../middlewares/ensureCategoryNotExistsMW";
import ensureDataIsValidMW from "../middlewares/ensureDataIsValidMW";
import ensureIsAdminMW from "../middlewares/ensureIsAdminMW";
import { categoryRequestSchema } from "../schemas/category.schema";

const categoryRoutes = Router()

categoryRoutes.post("/categories", ensureCategoryNotExistsMW, ensureIsAdminMW, ensureDataIsValidMW(categoryRequestSchema), createCategoryController)
categoryRoutes.get("/categories", listAllCategoriesController)
categoryRoutes.get("/categories/:categoryId/properties", listAllPropertiesFromCategoryByIdController)

export default categoryRoutes