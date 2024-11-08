import { TokenPayload } from "@/types/auth";
import jwt_decode from "jwt-decode";

export const saveToken = (token: string): void => {
  localStorage.setItem("token", token);
  console.log(localStorage.getItem("token"));
};

export const saveUserId = (id: string): void => {
  localStorage.setItem("userId", id);
  console.log(localStorage.getItem("userId"));
};

export const getUserId = (): string | null => {
  return localStorage.getItem("userId");
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const wipeToken = (): void => {
  localStorage.removeItem("token");
};

export const getDecodedToken = (): TokenPayload => {
  var token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  return jwt_decode(token);
};
