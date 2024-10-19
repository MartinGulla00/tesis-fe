import * as paths from "@/routing/paths";
import usePagination from "@/hooks/common/usePagination";
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

type Query = {
  _id: string;
  natural_language_query: string;
  sql_query_generated: string;
  timestamp: string;
  is_valid: boolean;
  user_id?: string;
  model?: string;
};

type Props = {
  queries: Query[];
};

const QueryListTable: React.FC<Props> = ({ queries }: Props) => {
  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(paths.QUERY_DETAILS + `?id=${id}`);
  };

  const {
    getCurrentData,
    handleNextPage,
    handlePrevPage,
    currentPage,
    maxPage,
  } = usePagination(queries, 10);

  const paginatedQueries = getCurrentData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="text-xl">Consultas Generadas</span>
        </CardTitle>
        <CardDescription>
          Aquí puedes ver las consultas generadas y sus detalles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Listado de todas las consultas registradas en el sistema.
            <PaginationControls
              currentPage={currentPage}
              maxPage={maxPage}
              onPrevious={handlePrevPage}
              onNext={handleNextPage}
            />
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Consulta en Lenguaje Natural</TableHead>
              <TableHead>SQL Generado</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Válida</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queries &&
              queries.length > 0 &&
              paginatedQueries.map((query, index) => (
                <TableRow
                  key={query._id}
                  className={`cursor-pointer hover:bg-gray-300 transition-colors ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                  onClick={() => handleRowClick(query._id)}
                >
                  <TableCell className="font-medium">{query._id}</TableCell>
                  <TableCell>{query.natural_language_query}</TableCell>
                  <TableCell>{query.sql_query_generated}</TableCell>
                  <TableCell>{query.model}</TableCell>
                  <TableCell>{new Date(query.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{query.is_valid ? "Sí" : "No"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default QueryListTable;
