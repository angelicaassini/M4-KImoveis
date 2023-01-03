import { IUserLogin } from "../../interfaces/users";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import "dotenv/config";
import AppError from "../../errors/AppError";

const loginUserService = async (userData: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: userData.email,
  });

  if (!user) {
    throw new AppError("Email or password invalid!", 403);
  }

  const passwordMatch = await compare(userData.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Email or password invalid!", 403);
  }

  const token = jwt.sign(
    {
      isActive: user.isActive,
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );

  if (user.isActive === false) {
    throw new AppError("This user is not active!", 400);
  }

  return token;
};
export default loginUserService;
