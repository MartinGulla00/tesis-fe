import { useQuery } from "react-query";
import { BaseResponse } from "@/utils/BaseResponse";
import { getRoles } from "@/services/roleService";
import { Role } from "@/types/role";

export const useRoles = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    BaseResponse<Role[]>,
    Error
  >("roles", getRoles);

  return {
    roles: data?.data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
