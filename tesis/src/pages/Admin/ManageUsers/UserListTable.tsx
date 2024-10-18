import * as paths from "@/routing/paths";
import usePagination from "@/hooks/common/usePagination";
import { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationControls from "@/components/PaginationControls";

type Props = {
  users: User[];
};

const UserListTable: React.FC<Props> = ({ users }: Props) => {
  const navigate = useNavigate();
  const handleRowClick = (id: string) => {
    navigate(paths.DEF_USER_INFO + `?id=${id}`);
  };

  const {
    getCurrentData,
    handleNextPage,
    handlePrevPage,
    currentPage,
    maxPage,
  } = usePagination(users, 10);
  const paginatedUsers = getCurrentData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="text-xl">Usuarios existentes</span>
        </CardTitle>
        <CardDescription>
          Aquí puede cambiar sus nombres, roles, y contraseñas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Listado de los usuarios activos del sistema.
            <PaginationControls
              currentPage={currentPage}
              maxPage={maxPage}
              onPrevious={handlePrevPage}
              onNext={handleNextPage}
            />
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Rol</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              users.length > 0 &&
              paginatedUsers.map((item, index) => (
                <TableRow
                  key={item.username}
                  className={`cursor-pointer hover:bg-gray-300 transition-colors ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                  onClick={() => handleRowClick(item._id)}
                >
                  <TableCell className="font-medium">{item.username}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.roleId?.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserListTable;
