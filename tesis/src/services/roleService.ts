import axios from "axios";
import { BaseResponse } from "../utils/BaseResponse";
import { CreateRole, EditRole, Role } from "@/types/role";
import { AssignPermission, Resource, ResourceRole } from "@/types/resource";

export const getRoles = async () => {
  const response = await axios.get<BaseResponse<Role[]>>(
    `${import.meta.env.VITE_API_URL}/api/roles`
  );
  return response.data;
};

export const getResources = async () => {
  const response = await axios.get<BaseResponse<Resource[]>>(
    `${import.meta.env.VITE_API_URL}/api/resources`
  );
  return response.data;
};

export const createRole = async (data: CreateRole) => {
  const response = await axios.post<BaseResponse<Role>>(
    `${import.meta.env.VITE_API_URL}/api/roles`,
    data
  );
  return response.data.data;
};

export const editRole = async (data: EditRole) => {
  const response = await axios.put<BaseResponse<Role>>(
    `${import.meta.env.VITE_API_URL}/api/roles/${data.id}`,
    data
  );
  return response.data.data;
};

export const assignPermission = async (data: AssignPermission) => {
  const response = await axios.post<BaseResponse<ResourceRole>>(
    `${import.meta.env.VITE_API_URL}/api/roles/resourceRoles`,
    data
  );
  return response.data.data;
};

export const deletePermission = async (id: string) => {
  const response = await axios.delete<BaseResponse<ResourceRole>>(
    `${import.meta.env.VITE_API_URL}/api/roles/resourceRoles/${id}`
  );
  return response.data.data;
};
