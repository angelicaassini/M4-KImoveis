import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserLogin } from "../interfaces/users";

const loginSchema: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});
export { loginSchema };

// .matches(/[A-Z]/, "Deve conter ao menos 1 letra maiúscula")
// .matches(/[a-z]/, "Deve conter ao menos 1 letra minúscula")
// .matches(/\d/, "Deve conter ao menos 1 número")
// .matches(/[\W|_]/, "Deve conter um caractere especial")
// .matches(/.{8,}/, "Deve ter no mínimo 8 caracteres")
