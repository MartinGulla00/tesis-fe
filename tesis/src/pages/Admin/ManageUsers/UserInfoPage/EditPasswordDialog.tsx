import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editUser } from "@/services/userService";
import { EditUser } from "@/types/user";
import { Pencil2Icon, ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

type Props = {
  id: string;
  onStatusUpdate: () => void;
};

function EditPasswordDialog({ id, onStatusUpdate }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPassword2, setNewPassword2] = useState<string>("");

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
        toast.success("Se ha cambiado la contraseña del usuario", {
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
          toast.error("Error al cambiar la contraseña", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      },
    }
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== newPassword2) {
      toast.error("Las contraseñas no son iguales", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else if (newPassword.length === 0 || newPassword2.length === 0) {
      toast.error("Debe ingresar una contraseña", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    handleEditUser({ id, password: newPassword });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Pencil2Icon className="text-zinc-600" onClick={openDialog} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar contraseña</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1.5 mb-2">
            <Label>Nueva contraseña</Label>
            <Input
              type="password"
              id="password"
              placeholder="Ingrese la nueva contraseña"
              autoComplete="off"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5 mb-4">
            <Label>Repetir nueva contraseña</Label>
            <Input
              type="password"
              id="password2"
              placeholder="Repita la nueva contraseña"
              autoComplete="off"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center w-full">
            {isLoading ? (
              <Button variant="default" disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Modificar contraseña
              </Button>
            ) : (
              <Button variant="default" type="submit">
                Modificar contraseña
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditPasswordDialog;
