import TextLabelPair from "@/components/TextLabelPair";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "react-query";
import { BaseResponse } from "@/utils/BaseResponse";
import Heading2 from "@/components/headings/Heading2";
import Loading from "@/components/Loading";
import EditUsernameDialog from "./EditUsernameDialog";
import EditPasswordDialog from "./EditPasswordDialog";
import EditRoleDialog from "./EditRoleDialog";
import { User } from "@/types/user";
import EditNameDialog from "./EditNameDialog";
import { getUserById } from "@/services/userService";

type Props = { id: string };

function UserDetails({ id }: Props) {
  const { data, isLoading, isError, error, refetch } = useQuery<
    BaseResponse<User>,
    Error
  >(["user"], async () => getUserById(id));

  return (
    <div className="w-full lg:w-1/4">
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="text-xl">Datos</span>
          </CardTitle>
          <CardDescription>Información general del usuario.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <Loading />}
          {isError && <p>Error: {error.message}</p>}
          {data?.data && (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between space-x-4">
                <TextLabelPair title="Nombre" text={data?.data.name} />
                <EditNameDialog
                  id={data?.data._id}
                  name={data?.data.name}
                  onStatusUpdate={refetch}
                />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <TextLabelPair title="Usuario" text={data?.data.username} />
                <EditUsernameDialog
                  id={data?.data._id}
                  username={data?.data.username}
                  onStatusUpdate={refetch}
                />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <TextLabelPair title="Contraseña" text="**********" />
                <EditPasswordDialog
                  id={data?.data._id}
                  onStatusUpdate={refetch}
                />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <TextLabelPair title="Rol" text={data?.data.roleId.name} />
                <EditRoleDialog
                  id={data?.data._id}
                  role={data?.data.roleId._id}
                  onStatusUpdate={refetch}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDetails;
