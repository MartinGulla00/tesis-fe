import { ResourceRole } from "@/types/resource";
import { getAuthDetails } from "./authStorage";

export const hasPermission = (resourceId: string): boolean => {
  const authState = getAuthDetails();

  return authState?.permissions.some(
    (permission: ResourceRole) => permission.resourceId.name === resourceId
  );
};
