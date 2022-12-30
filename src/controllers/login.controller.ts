import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users";
import loginUserService from "../Services/login/loginUser.service";

const loginUserController = async (req: Request, res: Response) => {
  const userData: IUserLogin = req.body;
  const token = await loginUserService(userData);
  return res.status(200).json({ token });
};

export { loginUserController };
