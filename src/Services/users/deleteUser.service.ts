import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";

// const deleteUserService = async (id: string) => {
//   const userRepository = AppDataSource.getRepository(User);
//   const userToBeRemoved = await userRepository.findOneBy({
//     id: id,
//   });

//   if (userToBeRemoved.isActive == false) {
//     throw new AppError("This user is not active", 400);
//   }

//   userToBeRemoved.isActive = false;
//   await userRepository.save(userToBeRemoved);

//   return userToBeRemoved;
const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const deletedUser = await userRepository.findOneBy({
    id: id,
    // withDeleted: true
  });
  if (!deletedUser) {
    throw new AppError("This user isn't exist", 404);
  }
  if (!deletedUser.isActive) {
    throw new AppError("This user is not active", 400);
  }

  console.log("deletedUser2:", deletedUser);

  // await userRepository.softRemove(deletedUser!);
  console.log("deletedUser3:", deletedUser);
  const userDeleted = await userRepository.save({
    ...deletedUser,
    isActive: false,
  });
  console.log("deletedUser4:", userDeleted);
};
export default deleteUserService;
