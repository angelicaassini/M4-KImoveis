import * as yup from "yup";
import { ICategoryRequest, ICategoryResponse } from "../interfaces/categories";
import { SchemaOf } from "yup";

const categoryRequestSchema: SchemaOf<ICategoryRequest> = yup.object().shape({
  name: yup.string().required(),
});

const categoryResponseSchema: SchemaOf<ICategoryResponse> = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
});

export { categoryRequestSchema, categoryResponseSchema };
