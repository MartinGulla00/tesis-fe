import { useMutation } from "react-query";
import useToaster from "../common/useToaster";
import { createRole } from "@/services/roleService";
import { CreateRole } from "@/types/role";

export const useCreateRole = (refetch: () => void) => {
  const { showToast, showToastError } = useToaster();

  const { isLoading, mutate: handleCreateRole } = useMutation(
    (data: CreateRole) => createRole(data),
    {
      onSuccess: (data) => {
        showToast("Se ha creado el rol");
        refetch();
      },
      onError: (err) => {
        showToastError(err, "Error al crear rol");
      },
    }
  );

  const validateInputs = (data: CreateRole) => {
    if (data.name.length === 0) {
      showToastError(null, "Debe ingresar un nombre");
      return false;
    }
    return true;
  };

  return { isLoading, handleCreateRole, validateInputs };
};
