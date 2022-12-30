import { Request, Response } from "express";
import { IPropertyRequest } from "../interfaces/properties";
import createPropertyService from "../Services/properties/createProperty.service";
import listAllPropertiesService from "../Services/properties/listAllProperties.service";

const createPropertyController = async (req: Request, res: Response) => {
  const propertyData: IPropertyRequest = req.body;
  const data = await createPropertyService(propertyData);
  return res.status(201).json(data);
};

const listAllPropertiesController = async (req: Request, res: Response) => {
  const data = await listAllPropertiesService();
  return res.status(200).json(data);
};

export { createPropertyController, listAllPropertiesController };
