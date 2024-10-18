import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Loading from "@/components/Loading";
import { CreateRole } from "@/types/role";
import { useResources } from "@/hooks/admin/useResources";
import { useForm } from "@/hooks/common/useForm";
import { useCreateRole } from "@/hooks/admin/useCreateRole";

type Props = {
  refetch: () => void;
};

function CreateRoleCard({ refetch }: Props) {
  const { resources, isLoading: isResourcesLoading, error } = useResources();
  const { values, handleChange } = useForm<CreateRole>({
    name: "",
    permissions: [],
  });

  const { handleCreateRole, isLoading, validateInputs } =
    useCreateRole(refetch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs(values)) {
      return;
    } else {
      handleCreateRole(values);
    }
  };

  const handlePermissionChange = (resourceId: string, checked: boolean) => {
    const updatedPermissions = checked
      ? [...values.permissions, resourceId]
      : values.permissions.filter((id) => id !== resourceId);

    handleChange(null, "permissions", updatedPermissions);
  };

  return (
    <Card className="h-min">
      <CardHeader>
        <CardTitle>
          <span className="text-xl">Crear rol</span>
        </CardTitle>
        <CardDescription>
          Aquí puede ingresar nuevos roles al sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1.5">
          <Label>Nombre del rol</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Ingrese el nombre del rol"
            value={values.name}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-start">
          <Label className="mb-1">Permisos</Label>
          <p className="mb-4 text-xs text-zinc-600">
            Seleccione las funcionalidades permitidas para los usuarios de este
            rol.
          </p>
          {isResourcesLoading && <Loading />}
          {error && <p>Error: {(error as Error).message}</p>}
          {resources?.map((resource) => (
            <div
              key={resource._id}
              className="flex items-center mb-3 space-x-2"
            >
              <Checkbox
                checked={values.permissions.includes(resource._id)}
                onCheckedChange={(checked: boolean) =>
                  handlePermissionChange(resource._id, checked)
                }
              />
              <Label>{resource.name}</Label>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {isLoading ? (
          <Button disabled>
            <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
            Creando
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Crear rol</Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default CreateRoleCard;
