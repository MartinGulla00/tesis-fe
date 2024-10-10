import { Role } from "@/types/role";
import { useForm } from "@/hooks/common/useForm";
import { useModifyRole } from "@/hooks/admin/useModifyRole";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil2Icon, ReloadIcon } from "@radix-ui/react-icons";
import DialogTriggerPseudoButton from "@/components/DialogTriggerPseudoButton";

type Props = {
  role: Role;
  onStatusUpdate: () => void;
};

export interface UpdateSaleItemStatusRequest {
  _id: string;
  returned?: boolean;
}

const EditRoleNameDialog: React.FC<Props> = ({
  role,
  onStatusUpdate,
}: Props) => {
  const { values, handleChange } = useForm({ id: role._id, name: role.name });
  const { isModifyNameLoading, handleModifyRoleName, validateRoleNameInput } =
    useModifyRole(onStatusUpdate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRoleNameInput(values.name, role.name)) {
      return;
    } else {
      handleModifyRoleName(values);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <DialogTriggerPseudoButton
          text="Editar nombre"
          size="icon"
          className="hover:bg-zinc-400"
          variant="ghost"
          icon={<Pencil2Icon className="w-4 h-4" />}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Editar rol: <span className="font-bold">{role.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full">
          <div className="flex flex-col space-y-1.5 mb-4">
            <div className="mb-4">
              <Label className="mb-1">Cambiar nombre</Label>
              <p className="text-xs text-zinc-600">
                Escriba aquí el nuevo nombre del rol.
              </p>
            </div>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Ingrese el nuevo nombre"
              autoComplete="off"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          {isModifyNameLoading ? (
            <Button disabled className="self-end mt-4">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Cambiando nombre
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="self-end mt-4">
              Cambiar nombre
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRoleNameDialog;
