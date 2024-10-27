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
import { useState } from "react";
import { Role } from "@/types/role";
import RoleListItemOptions from "./RoleListItemOptions";
import PaginationControls from "@/components/PaginationControls";
import usePagination from "@/hooks/common/usePagination";

type Props = {
  roles: Role[];
  refetch: () => void;
};

const RoleListTable: React.FC<Props> = ({ roles, refetch }: Props) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const {
    getCurrentData,
    handleNextPage,
    handlePrevPage,
    currentPage,
    maxPage,
  } = usePagination(roles, 10);
  const paginatedUsers = getCurrentData();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span className="text-xl">Roles existentes</span>
        </CardTitle>
        <CardDescription>
          Aquí puede cambiar sus nombres y permisos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Listado de los roles del sistema.
            <PaginationControls
              currentPage={currentPage}
              maxPage={maxPage}
              onPrevious={handlePrevPage}
              onNext={handleNextPage}
            />
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Rol</TableHead>
              <TableHead className="text-center">Usuarios</TableHead>
              <TableHead className="text-center">Permisos</TableHead>
              <TableHead className="text-center w-[100px]">&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers &&
              paginatedUsers.length > 0 &&
              paginatedUsers.map((role, index) => (
                <TableRow
                  key={role.name}
                  className={`hover:bg-gray-300 transition-colors ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="text-center">
                    {role.users.length}
                  </TableCell>
                  <TableCell className="text-center">
                    {role.permissions.length}
                  </TableCell>
                  <TableCell className="flex items-end justify-center w-[100px]">
                    {hoveredRow === index ? (
                      <RoleListItemOptions
                        isHovered={true}
                        role={role}
                        onStatusUpdate={refetch}
                      />
                    ) : (
                      <RoleListItemOptions isHovered={false} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RoleListTable;
