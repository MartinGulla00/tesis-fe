import { ResourceRole } from "./resource";
import { User } from "./user";

// for redux store
export interface TokenPayload {
  user: User;
  permissions: ResourceRole[];
  timestamp: number;
}
export interface AuthStateValue {
  user: User;
  permissions: ResourceRole[] | [];
  token: string;
  timestamp: number;
}

// for zustand store
export interface AuthState {
  user: User | null;
  token: string | null;
  permissions: string[];
}

export type AuthAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_TOKEN"; payload: string | null }
  | { type: "SET_PERMISSIONS"; payload: string[] }
  | { type: "LOGOUT" };
