import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as paths from "../paths";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

type Props = {
  children?: React.ReactNode;
};

export default function ProtectedRouteUserType({
  children,
}: Props): JSX.Element {
  const authState = useSelector((state: RootState) => state.auth.value);

  if (authState === null || authState.token === null) {
    return <Navigate to={paths.LOGIN} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
