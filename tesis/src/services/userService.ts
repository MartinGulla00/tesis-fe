import axios from "axios";
import { BaseResponse } from "../utils/BaseResponse";
import {
  EditUser,
  LoginUser,
  LoginUserResponse,
  RegisterUser,
  RegisterUserResponse,
  User,
} from "@/types/user";

export const registerUser = async (data: RegisterUser) => {
  const response = await axios.post<BaseResponse<RegisterUserResponse>>(
    `${import.meta.env.VITE_API_URL}/api/users/register`,
    data
  );
  return response.data.data;
};

export const loginUser = async (data: LoginUser) => {
  const response = await axios.post<BaseResponse<LoginUserResponse>>(
    `${import.meta.env.VITE_API_URL}/api/users/login`,
    data
  );
  return response.data.data;
};

export const verifyToken = async () => {
  const response = await axios.get<BaseResponse<LoginUserResponse>>(
    `${import.meta.env.VITE_API_URL}/api/users/verify`
  );
  return response.data;
};

export const logoutUser = async () => {
  await axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`);
};

export const getUsers = async () => {
  const response = await axios.get<BaseResponse<User[]>>(
    `${import.meta.env.VITE_API_URL}/api/users`
  );
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await axios.get<BaseResponse<User>>(
    `${import.meta.env.VITE_API_URL}/api/users/${id}`
  );
  return response.data;
};

export const editUser = async (data: EditUser) => {
  const response = await axios.put<BaseResponse<User>>(
    `${import.meta.env.VITE_API_URL}/api/users/${data.id}`,
    data
  );
  return response.data;
};
