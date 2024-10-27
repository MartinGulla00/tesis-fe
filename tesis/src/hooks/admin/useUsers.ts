import { useQuery } from "react-query";
import { getUsers } from "@/services/userService";
import { BaseResponse } from "@/utils/BaseResponse";
import { User } from "@/types/user";

export const useUsers = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    BaseResponse<User[]>,
    Error
  >("users", getUsers);

  return {
    users: data?.data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
