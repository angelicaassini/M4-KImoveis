import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IAddressRequest,
  IAddressResponse,
  IPropertyRequest,
  IPropertyResponse,
} from "../interfaces/properties";

const addressRequestSchema: SchemaOf<IAddressRequest> = yup.object().shape({
  district: yup.string().required(),
  zipCode: yup.string().required(),
  number: yup.string(),
  city: yup.string().required(),
  state: yup.string().required(),
});

const adressResponseSchema: SchemaOf<IAddressResponse> = yup.object().shape({
  id: yup.string().required(),
  district: yup.string().required(),
  zipCode: yup.string().required(),
  number: yup.string(),
  city: yup.string().required(),
  state: yup.string().required(),
});

const propertyRequestSchema: SchemaOf<IPropertyRequest> = yup.object().shape({
  value: yup.number().required(),
  size: yup.number().required(),
  address: addressRequestSchema,
  categoryId: yup.string().required(),
});

const propertyResponseSchema: SchemaOf<IPropertyResponse> = yup.object().shape({
  categoryId: yup.string().required(),
  sold: yup.boolean().required(),
  value: yup.number().required(),
  size: yup.number().required(),
  address: addressRequestSchema,
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
});

export {
  addressRequestSchema,
  adressResponseSchema,
  propertyRequestSchema,
  propertyResponseSchema,
};
