import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ResourceRole } from "@/types/resource";

export const hasPermission = (resourceId: string): boolean => {
  const permissions = useSelector(
    (state: RootState) => state.auth.value?.permissions || []
  );
  return permissions.some(
    (permission: ResourceRole) => permission.resourceId.name === resourceId
  );
};
