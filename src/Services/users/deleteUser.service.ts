import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const deletedUser = await userRepository.findOneBy({
    id: id,
  });
  if (!deletedUser) {
    throw new AppError("This user isn't exist", 404);
  }
  if (!deletedUser.isActive) {
    throw new AppError("This user is not active", 400);
  }

  const userDeleted = await userRepository.save({
    ...deletedUser,
    isActive: false,
  });

};
export default deleteUserService;
