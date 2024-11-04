import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/userService";
import * as paths from "@/routing/paths";
import { LoginUser } from "@/types/user";
import useToaster from "../common/useToaster";
import { saveAuthDetails } from "@/utils/authStorage";
import { saveToken, saveUserId } from "@/utils/tokenStorage";

export const useLogin = () => {
  const navigate = useNavigate();
  const { showToast, showToastError } = useToaster();

  const { isLoading, mutate: handleLogin } = useMutation(
    (data: LoginUser) => loginUser(data),
    {
      onSuccess: (data) => {
        saveAuthDetails(data);
        saveToken(data?.token);
        saveUserId(data?.user._id);
        showToast("Bienvenido!");
        navigate(paths.LANDING);
      },
      onError: (err) => {
        showToastError(err, "Error al iniciar sesión");
      },
    }
  );

  return { isLoading, handleLogin };
};
