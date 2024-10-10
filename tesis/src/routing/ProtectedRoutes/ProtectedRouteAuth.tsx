import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as paths from "../paths";
import { getAuthDetails } from "@/utils/authStorage";

type Props = {
  children?: React.ReactNode;
};

export default function ProtectedRouteUserType({
  children,
}: Props): JSX.Element {
  const authState = getAuthDetails();
  console.log(authState);

  if (authState === null || authState.token === null) {
    return <Navigate to={paths.LOGIN} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
