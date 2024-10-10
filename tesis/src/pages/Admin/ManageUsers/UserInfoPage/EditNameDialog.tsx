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
  name: string;
  onStatusUpdate: () => void;
};

function EditNameDialog({ id, name, onStatusUpdate }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");

  useEffect(() => {
    setNewName(name);
  }, [name]);

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
        toast.success("Se ha cambiado el nombre del usuario", {
          position: toast.POSITION.TOP_CENTER,
        });
        closeDialog();
        onStatusUpdate();
      },
      onError: (err) => {
        if (axios.isAxiosError(err)) {
          toast.error(
            err.response?.data.error.message || "Error al cambiar nombre",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else {
          toast.error("Error al cambiar nombre", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      },
    }
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newName.length === 0) {
      toast.error("Debe ingresar un nombre", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    handleEditUser({ id, name: newName });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Pencil2Icon className="text-zinc-600" onClick={openDialog} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar nombre</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1.5 mb-4">
            <Label>Nuevo nombre</Label>
            <Input
              type="text"
              id="name"
              placeholder="Ingrese su usuario"
              autoComplete="off"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center w-full">
            {isLoading ? (
              <Button variant="default" disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Modificar nombre
              </Button>
            ) : (
              <Button
                type="submit"
                variant="default"
                onClick={(e) => handleSubmit(e)}
              >
                Modificar nombre
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditNameDialog;
