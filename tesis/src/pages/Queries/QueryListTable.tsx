import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as paths from "@/routing/paths";

type Props = {
  queries: any[];
  onUpdateValidity: (id: string, isValid: boolean) => void; 
};

const QueryListTable: React.FC<Props> = ({ queries = [], onUpdateValidity }: Props) => {
  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`${paths.QUERY_DETAILS}?id=${id}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Consulta en Lenguaje Natural</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Válida</TableHead>
          <TableHead>Modelo</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(Array.isArray(queries) ? queries : []).map((query) => (
          <TableRow
            key={query._id}
            onClick={() => handleRowClick(query._id)}
            className="cursor-pointer hover:bg-gray-200"
          >
            <TableCell>{query.natural_language_query}</TableCell>
            <TableCell>{new Date(query.timestamp).toLocaleString()}</TableCell>
            <TableCell>{query.is_valid ? "Sí" : "No"}</TableCell>
            <TableCell>{query.model}</TableCell>
            <TableCell>
              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  onUpdateValidity(query._id, !query.is_valid);
                }}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                {query.is_valid ? "Marcar como No Válida" : "Marcar como Válida"}
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default QueryListTable;
