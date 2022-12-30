import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUser,
  IUserRequest,
  IUserUpdate,
} from "../interfaces/users";

const userRequestSchema: SchemaOf<IUserRequest|any> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  isAdm: yup.boolean(),
});

const userResponseWithoutPasswordSchema: SchemaOf<IUser|any> = yup
  .object()
  .shape({
    id: yup.string(),
    name: yup.string(),
    email: yup.string(),
    isAdm: yup.boolean(),
    // isActive: yup.boolean().default(true),
    createdAt: yup.date(),
    updatedAt: yup.date(),
  });

const userUpdateRequestSchema: SchemaOf<IUserUpdate> = yup
  .object()
  .shape({
    name: yup.string().notRequired(),
    email: yup.string().notRequired(),
    password: yup.string().notRequired(),
  });

export {
  userRequestSchema,
  userResponseWithoutPasswordSchema,
  userUpdateRequestSchema,
};
