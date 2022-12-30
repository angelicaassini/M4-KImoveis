import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users";
import createUserService from "../Services/users/createUser.service";
import listAllUsersService from "../Services/users/listAllUsers.service";
import updateUserService from "../Services/users/updateUser.service";
import deleteUserService from "../Services/users/deleteUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const data = await createUserService(userData);
  return res.status(201).json(data);
};

const listAllUsersController = async (req: Request, res: Response) => {
  const data = await listAllUsersService();
  return res.json(data);
};

const updateUserController = async (req: Request, res: Response) => {
  const params_id: string = req.params.id;

  const data = await updateUserService(req.body, params_id);
  return res.status(200).json(data);
};

const deleteUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data = await deleteUserService(id);
  return res.status(204).json({});
};

export {
  createUserController,
  listAllUsersController,
  updateUserController,
  deleteUserController,
};
