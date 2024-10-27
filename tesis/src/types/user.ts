import { Role } from "./role";

export interface User {
  _id: string;
  name: string;
  username: string;
  password?: string;
  roleId: Role;
}

export interface RegisterUser {
  name: string;
  username: string;
  password: string;
  roleId: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface EditUser {
  id: string;
  name?: string;
  username?: string;
  password?: string;
  roleId?: string;
}

export interface RegisterUserResponse {
  token: string;
  user: User;
}

export interface LoginUserResponse {
  token: string;
  user: User;
}
