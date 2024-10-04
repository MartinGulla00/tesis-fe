// ProtectedWrapper.tsx
import React from "react";
import { ResourceRole } from "@/types/resource";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

type Props = {
  resourceId: string;
  children: React.ReactNode;
};

export default function ProtectedWrapper({
  resourceId,
  children,
}: Props): JSX.Element {
  const permissions = useSelector(
    (state: RootState) => state.auth.value.permissions
  );

  const hasPermission = permissions?.some((permission: ResourceRole) => {
    return permission.resourceId.name === resourceId;
  });

  if (!hasPermission) {
    return <div />;
  }

  return <>{children}</>;
}
