import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil2Icon, ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editUser } from "@/services/userService";
import { BaseResponse } from "@/utils/BaseResponse";
import { Role } from "@/types/role";
import { getRoles } from "@/services/roleService";
import { EditUser } from "@/types/user";

type Props = {
  id: string;
  role: string;
  onStatusUpdate: () => void;
};

function EditRoleDialog({ id, role, onStatusUpdate }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newRole, setNewRole] = useState<string>("");

  const {
    data,
    isLoading: isRolesLoading,
    isError,
    error,
    refetch,
  } = useQuery<BaseResponse<Role[]>, Error>(["roles"], async () => getRoles());

  useEffect(() => {
    setNewRole(role);
  }, [role]);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const { isLoading, mutate: handleEditUser } = useMutation(
    (data: EditUser) => editUser(data),
    {
      onSuccess: (data) => {
        toast.success("Se ha modificado el rol del usuario", {
          position: toast.POSITION.TOP_CENTER,
        });
        closeDialog();
        onStatusUpdate();
      },
      onError: (err) => {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data.error.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Error al modificar rol", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      },
    }
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newRole.length === 0) {
      toast.error("Debe seleccionar un rol", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    handleEditUser({ id, roleId: newRole });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Pencil2Icon className="text-zinc-600" onClick={openDialog} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar rol</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1.5 mb-4">
            <Label>Rol</Label>
            <Select
              value={newRole}
              onValueChange={(value) => setNewRole(value)}
            >
              {isRolesLoading ? (
                <>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Cargando roles..." />
                  </SelectTrigger>
                  <SelectContent></SelectContent>
                </>
              ) : (
                <>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar un rol..." />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.data?.map((role) => (
                      <SelectItem key={role._id} value={role._id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </>
              )}
            </Select>
          </div>
          <div className="flex items-center justify-center w-full">
            {isLoading ? (
              <Button variant="default" disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Modificar rol
              </Button>
            ) : (
              <Button variant="default" type="submit">
                Modificar rol
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditRoleDialog;
