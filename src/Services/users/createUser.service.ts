import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest, IUserResponse } from "../../interfaces/users";
import {
  userRequestSchema,
  userResponseWithoutPasswordSchema,
} from "../../schemas/user.schema";

const createUserService = async (
  userData: IUserRequest
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const validatedUserData = await userRequestSchema.validate(userData);
  const createdUser = userRepository.create(validatedUserData);

  await userRepository.save(createdUser);

  const userResponseWithoutPassword =
    await userResponseWithoutPasswordSchema.validate(createdUser, {
      stripUnknown: true,
      abortEarly: false,
    });

  return userResponseWithoutPassword;
};
export default createUserService;
