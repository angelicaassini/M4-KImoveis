import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const listAllUsersService = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  await userRepository.save(users);

  return users.map((user) => {
    return { ...user, hashPassword: undefined, password: undefined };
  });
};
export default listAllUsersService;
