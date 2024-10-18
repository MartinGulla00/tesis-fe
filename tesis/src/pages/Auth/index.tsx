import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAuthRedirect } from "@/hooks/auth/useAuthRedirect";
import { useLogin } from "@/hooks/auth/useLogin";
import { useForm } from "@/hooks/common/useForm";

const Login: React.FC = () => {
  useAuthRedirect();

  const { isLoading, handleLogin } = useLogin();
  const { values, handleChange } = useForm({ username: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(values);
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card className="shadow-2xl w-full md:w-1/2 lg:w-1/3 xl:w-1/4 pt-4 pb-2">
        <CardHeader>
          <CardTitle className="flex w-full justify-center items-center">
            {/* <img src={logo} alt="Logo de la empresa" className="w-32 h-auto" />{" "} */}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Ingrese su usuario"
                  value={values.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Ingrese su contraseña"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center mt-2">
            {isLoading ? (
              <Button type="submit" disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Espere
              </Button>
            ) : (
              <Button type="submit">Ingresar</Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
