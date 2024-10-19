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
};

const QueryListTable: React.FC<Props> = ({ queries }: Props) => {
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {queries.map((query) => (
          <TableRow
            key={query._id}
            onClick={() => handleRowClick(query._id)}
            className="cursor-pointer hover:bg-gray-200"
          >
            <TableCell>{query.natural_language_query}</TableCell>
            <TableCell>{new Date(query.timestamp).toLocaleString()}</TableCell>
            <TableCell>{query.is_valid ? "Sí" : "No"}</TableCell>
            <TableCell>{query.model}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default QueryListTable;
