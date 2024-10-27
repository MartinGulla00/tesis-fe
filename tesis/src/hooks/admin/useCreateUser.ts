import { useMutation } from "react-query";
import { registerUser } from "@/services/userService";
import { RegisterUser } from "@/types/user";
import useToaster from "../common/useToaster";

export const useCreateUser = (refetch: () => void) => {
  const { showToast, showToastError } = useToaster();

  const { isLoading, mutate: handleCreateUser } = useMutation(
    (data: RegisterUser) => registerUser(data),
    {
      onSuccess: (data) => {
        showToast("Se ha creado el usuario");
        refetch();
      },
      onError: (err) => {
        showToastError(err, "Error al crear usuario");
      },
    }
  );

  const validatePassword = (password: string, password2: string) => {
    if (password !== password2) {
      showToastError(null, "Las contraseñas no son iguales");
      return false;
    }
    return true;
  };

  const validateInputs = (data: RegisterUser) => {
    if (data.name.length === 0) {
      showToastError(null, "Debe ingresar un nombre");
      return false;
    } else if (data.username.length === 0) {
      showToastError(null, "Debe ingresar un usuario");
      return false;
    } else if (data.password.length === 0) {
      showToastError(null, "Debe ingresar una contraseña");
      return false;
    } else if (data.username.length === 0) {
      showToastError(null, "Debe ingresar un nombre de usuario");
      return false;
    } else if (data.roleId.length === 0) {
      showToastError(null, "Debe seleccionar un rol");
      return false;
    }
    return true;
  };

  return { isLoading, handleCreateUser, validatePassword, validateInputs };
};
