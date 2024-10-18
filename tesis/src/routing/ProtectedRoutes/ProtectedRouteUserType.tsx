// ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as paths from "@/routing/paths"; // Adjust the import path as necessary
import { ResourceRole } from "@/types/resource";
import { getAuthDetails } from "@/utils/authStorage";

type Props = {
  children?: React.ReactNode;
  permissions: string[];
};

export default function ProtectedRouteUserType({
  children,
  permissions: allowedPerms,
}: Props): JSX.Element {
  const authState = getAuthDetails();

  const hasPermission = authState?.permissions?.some(
    (permission: ResourceRole) => {
      return allowedPerms.includes(permission.resourceId.name);
    }
  );

  if (!authState.token) {
    return <Navigate to={paths.LOGIN} replace />;
  }
  if (!hasPermission) {
    return <Navigate to={paths.NOT_AUTHORIZED} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
