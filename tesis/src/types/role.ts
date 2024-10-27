import { ResourceRole } from "./resource";
import { User } from "./user";

export interface Role {
  _id: string;
  name: string;
  users: User[];
  permissions?: ResourceRole[];
}

export interface CreateRole {
  name: string;
  permissions: string[];
}

export interface EditRole {
  id: string;
  name: string;
}
