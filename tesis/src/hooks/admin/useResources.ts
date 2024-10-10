import { useQuery } from "react-query";
import { BaseResponse } from "@/utils/BaseResponse";
import { getResources, getRoles } from "@/services/roleService";
import { Role } from "@/types/role";
import { Resource } from "@/types/resource";

export const useResources = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    BaseResponse<Resource[]>,
    Error
  >("resources", getResources);

  return {
    resources: data?.data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
