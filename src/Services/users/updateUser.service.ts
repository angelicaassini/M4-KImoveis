import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import {
  IUserRequest,
  IUserRequestUpdate,
  IUserResponse,
} from "../../interfaces/users";
import { userResponseWithoutPasswordSchema } from "../../schemas/user.schema";

const updateUserService = async (
  userData: IUserRequestUpdate,
  params_id: string
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser: IUserRequest = await userRepository.findOneBy({
    id: params_id,
  });

  const updatedUser = userRepository.create({
    ...findUser,
    ...userData,
  });
  await userRepository.save(updatedUser);

  const updatedUserWithoutPassword =
    await userResponseWithoutPasswordSchema.validate(updatedUser, {
      stripUnknown: true,
    });

  return updatedUserWithoutPassword;
};
export default updateUserService;
