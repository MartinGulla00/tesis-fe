import { Role } from "@/types/role";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MixerHorizontalIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Resource } from "@/types/resource";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DialogTriggerPseudoButton from "@/components/DialogTriggerPseudoButton";
import { useResources } from "@/hooks/admin/useResources";
import { useModifyRole } from "@/hooks/admin/useModifyRole";
import Loading from "@/components/Loading";

export interface UpdateSaleItemStatusRequest {
  _id: string;
  returned?: boolean;
}

type Props = {
  role: Role;
  onStatusUpdate: () => void;
};

const EditRolePermissionsDialog: React.FC<Props> = ({
  role,
  onStatusUpdate,
}: Props) => {
  const [resourceToUpdate, setResourceToUpdate] = useState<string>("");
  const [resources, setResources] = useState([]);

  const {
    resources: resourcesData,
    isLoading: isResourcesLoading,
    isError,
    error,
    refetch,
  } = useResources();

  useEffect(() => {
    if (resourcesData) {
      const updatedResources = resourcesData
        ?.map((resource) => {
          const matchingPermission = role.permissions.find(
            (permission) =>
              (permission.resourceId as Resource)._id === resource._id
          );

          return {
            ...resource,
            checked: !!matchingPermission,
            permissionId: matchingPermission
              ? matchingPermission._id
              : undefined,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
      setResources(updatedResources);
    }
  }, [resourcesData, role.permissions]);

  const {
    handleRemovePermission,
    isRemovePermissionLoading,
    handleAssignPermission,
    isAssignPermissionLoading,
  } = useModifyRole(onStatusUpdate);

  const handleCheckedChange = async (
    checked: boolean,
    resourceId: string,
    permissionId: string | undefined
  ) => {
    setResourceToUpdate(resourceId);
    if (checked) {
      handleAssignPermission(
        { roleId: role._id, resourceId },
        {
          onSuccess: (data) => {
            const newPermissionId = data._id;

            const updatedResources = resources.map((res) => {
              if (res._id === resourceId) {
                return { ...res, checked, permissionId: newPermissionId };
              }
              return res;
            });

            setResources(updatedResources);
          },
        }
      );
    } else {
      handleRemovePermission(permissionId, {
        onSuccess: () => {
          const updatedResources = resources.map((res) => {
            if (res._id === resourceId) {
              return { ...res, checked, permissionId: undefined };
            }
            return res;
          });

          setResources(updatedResources);
        },
      });
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
          icon={<MixerHorizontalIcon className="w-4 h-4" />}
        />
      </DialogTrigger>

      <DialogContent className="max-h-[90%] overflow-scroll">
        <DialogHeader>
          <DialogTitle>
            Editar rol: <span className="font-bold">{role.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full mt-2 mb-2">
          <Label className="mb-1">Modificar permisos</Label>
          <p className="text-xs text-zinc-600">
            Toque las casillas para habilitar/deshabilitar permisos para este
            rol.
          </p>
          <div className="w-full mt-6 border-2 border-zinc-200 rounded-lg">
            {isResourcesLoading && <Loading />}
            {resources &&
              resources.map((res, index) => (
                <div
                  key={res.name}
                  className={`flex items-center justify-between p-3 border-b-2 border-zinc-200 last:border-0 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <Label>{res.name}</Label>
                  <div className="flex items-center">
                    {res._id === resourceToUpdate &&
                      (isAssignPermissionLoading ||
                        isRemovePermissionLoading) && (
                        <ReloadIcon className="animate-spin mr-2 h-4 w-4 text-zinc-600" />
                      )}
                    <Switch
                      disabled={
                        res._id === resourceToUpdate &&
                        (isAssignPermissionLoading || isRemovePermissionLoading)
                      }
                      checked={res.checked}
                      onCheckedChange={(checked) =>
                        handleCheckedChange(checked, res._id, res.permissionId)
                      }
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRolePermissionsDialog;
