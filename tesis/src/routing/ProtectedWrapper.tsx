// ProtectedWrapper.tsx
import React from "react";
import { ResourceRole } from "@/types/resource";
import { getAuthDetails } from "@/utils/authStorage";

type Props = {
  resourceId: string;
  children: React.ReactNode;
};

export default function ProtectedWrapper({
  resourceId,
  children,
}: Props): JSX.Element {
  const authState = getAuthDetails();

  const hasPermission = authState?.permissions?.some(
    (permission: ResourceRole) => {
      return permission.resourceId.name === resourceId;
    }
  );

  if (!hasPermission) {
    return <div />;
  }

  return <>{children}</>;
}
