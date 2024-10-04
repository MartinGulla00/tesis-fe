import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/userService";
import { login } from "@/state/auth/authSlice";
import * as paths from "@/routing/paths";
import { AppDispatch } from "@/state/store";
import { LoginUser } from "@/types/user";
import useToaster from "../common/useToaster";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { showToast, showToastError } = useToaster();

  const { isLoading, mutate: handleLogin } = useMutation(
    (data: LoginUser) => loginUser(data),
    {
      onSuccess: (data) => {
        dispatch(login(data));
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
