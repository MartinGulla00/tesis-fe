// ProtectedRoute.tsx
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as paths from "@/routing/paths"; // Adjust the import path as necessary
import { Resource, ResourceRole } from "@/types/resource";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

type Props = {
  children?: React.ReactNode;
  permissions: string[];
};

export default function ProtectedRouteUserType({
  children,
  permissions: allowedPerms,
}: Props): JSX.Element {
  const authState = useSelector((state: RootState) => state.auth.value);

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
