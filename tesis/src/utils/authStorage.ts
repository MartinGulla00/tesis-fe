import { getDecodedToken, getToken } from "./tokenStorage";
import jwt_decode from "jwt-decode";

export const saveAuthDetails = (data: any): void => {
  var decodedToken = jwt_decode(data.token);
  data.permissions = (decodedToken as any).permissions;
  const serializedData = JSON.stringify(data);
  localStorage.setItem("auth", serializedData);
};

export const getAuthDetails = (): any | null => {
  const data = localStorage.getItem("auth");
  if (!data) return null;
  let authData = JSON.parse(data);
  var decodedToken = getDecodedToken();
  authData.permissions = decodedToken.permissions;
  return JSON.parse(data);
};

export const wipeAuthData = (): void => {
  localStorage.removeItem("auth");
  localStorage.removeItem("token");
};
