import { TokenPayload } from "@/types/auth";
import jwt_decode from "jwt-decode";

export const saveToken = (token: string): void => {
  localStorage.setItem("token", token);
  console.log(localStorage.getItem("token"));
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
