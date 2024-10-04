import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegisterUser } from "@/types/user";
import { useForm } from "@/hooks/common/useForm";
import { useRoles } from "@/hooks/admin/useRoles";
import { useCreateUser } from "@/hooks/admin/useCreateUser";

type Props = {
  onStatusUpdate: () => void;
};

function CreateUserCard({ onStatusUpdate }: Props) {
  const { roles, isLoading: isRolesLoading } = useRoles();
  const [password2, setPassword2] = useState<string>("");
  const { values, handleChange } = useForm<RegisterUser>({
    username: "",
    password: "",
    name: "",
    roleId: "",
  });
  const {
    isLoading: isMutateLoading,
    handleCreateUser,
    validatePassword,
    validateInputs,
  } = useCreateUser(onStatusUpdate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !validatePassword(values.password, password2) ||
      !validateInputs(values)
    ) {
      return;
    } else {
      handleCreateUser(values);
    }
  };

  return (
    <Card className="h-min">
      <CardHeader>
        <CardTitle>
          <span className="text-xl">Crear usuario</span>
        </CardTitle>
        <CardDescription>
          Aquí puede ingresar nuevos usuarios al sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1.5">
          <Label>Nombre completo</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Ingrese el nombre completo"
            value={values.name}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Usuario</Label>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Ingrese el usuario"
            value={values.username}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Contraseña</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Ingrese una contraseña"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Repetir contraseña</Label>
          <Input
            type="password"
            id="password2"
            placeholder="Repita la contraseña"
            value={password2}
            autoComplete="off"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1.5 mb-4">
          <Label>Rol</Label>
          <Select
            value={values.roleId}
            onValueChange={(value) => handleChange(null, "roleId", value)}
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
                  {roles?.map((role) => (
                    <SelectItem key={role._id} value={role._id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </>
            )}
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        {isMutateLoading ? (
          <Button disabled>
            <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
            Creando
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Crear usuario</Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default CreateUserCard;
