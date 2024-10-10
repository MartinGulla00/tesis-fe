import { useMutation } from "react-query";
import useToaster from "../common/useToaster";
import {
  assignPermission,
  deletePermission,
  editRole,
} from "@/services/roleService";
import { EditRole } from "@/types/role";
import { AssignPermission } from "@/types/resource";

export const useModifyRole = (refetch: () => void) => {
  const { showToast, showToastError } = useToaster();

  const { isLoading: isModifyNameLoading, mutate: handleModifyRoleName } =
    useMutation((data: EditRole) => editRole(data), {
      onSuccess: (data) => {
        showToast("Se ha modificado el rol");
        refetch();
      },
      onError: (err) => {
        showToastError(err, "Error al modificar rol");
      },
    });

  const validateRoleNameInput = (newName: string, oldName: string) => {
    if (newName.length === 0) {
      showToastError(null, "Debe ingresar un nombre");
      return false;
    } else if (oldName === newName) {
      showToastError(null, "El nombre nuevo es el mismo");
      return false;
    }
    return true;
  };

  const {
    mutate: handleAssignPermission,
    isLoading: isAssignPermissionLoading,
  } = useMutation((data: AssignPermission) => assignPermission(data), {
    onSuccess: (data) => {
      showToast("Se ha asignado el permiso");
      refetch();
    },
    onError: (err) => {
      showToastError(err, "Error al asignar permiso");
    },
  });

  const {
    mutate: handleRemovePermission,
    isLoading: isRemovePermissionLoading,
  } = useMutation((id: string) => deletePermission(id), {
    onSuccess: (data) => {
      showToast("Se ha eliminado el permiso");
      refetch();
    },
    onError: (err) => {
      showToastError(err, "Error al eliminar permiso");
    },
  });

  return {
    isModifyNameLoading,
    handleModifyRoleName,
    validateRoleNameInput,
    handleRemovePermission,
    isRemovePermissionLoading,
    handleAssignPermission,
    isAssignPermissionLoading,
  };
};
