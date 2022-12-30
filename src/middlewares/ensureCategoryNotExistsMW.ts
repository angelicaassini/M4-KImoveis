import { NextFunction, Request, Response } from "express"
import AppDataSource from "../data-source";
import Category from "../entities/category.entity";
import AppError from "../errors/AppError";

const ensureCategoryNotExistsMW = async(req:Request, res: Response, next: NextFunction) => {
    const categoryRepo = AppDataSource.getRepository(Category)
    const foundCategory = await categoryRepo.findOneBy({name: req.body.name})

    if(foundCategory){
        throw new AppError("This category already exists", 409)
    }

    next()
}
export default ensureCategoryNotExistsMW
