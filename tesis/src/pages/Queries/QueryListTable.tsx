import React, { useState } from "react";
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

type Filters = {
  queryText: string;
  model: string;
  isValid: "all" | "true" | "false"; 
  date: string; 
  customDateRange?: { start: string; end: string };
};

type Props = {
  queries: any[];
  onUpdateValidity: (id: string, isValid: boolean) => void;
};

const QueryListTable: React.FC<Props> = ({ queries = [], onUpdateValidity }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    queryText: "",
    model: "",
    isValid: "all",
    date: "all",
    customDateRange: { start: "", end: "" },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const calculateDateRange = (date: string) => {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); 

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); 

    if (date === "today") {
      return [startOfToday, endOfToday];
    } else if (date === "this_week") {
      return [startOfWeek, endOfToday];
    } else if (date === "this_month") {
      return [startOfMonth, endOfToday];
    } else if (date === "custom") {
      const start = filters.customDateRange?.start
        ? new Date(filters.customDateRange.start)
        : null;
      const end = filters.customDateRange?.end
        ? new Date(filters.customDateRange.end)
        : null;
      return [start, end];
    }
    return [null, null]; 
  };

  const filteredQueries = queries.filter((query) => {
    const queryDate = new Date(query.timestamp);
    const { queryText, model, isValid, date } = filters;

    const matchesText = queryText
      ? query.natural_language_query.toLowerCase().includes(queryText.toLowerCase())
      : true;

    const matchesModel = model ? query.model === model : true;

    const matchesValid =
      isValid === "all" ? true : query.is_valid === (isValid === "true");

    const [startDate, endDate] = calculateDateRange(date);
    const matchesDate =
      startDate && endDate
        ? queryDate >= startDate && queryDate <= endDate
        : true;

    return matchesText && matchesModel && matchesValid && matchesDate;
  });

  const paginatedQueries = filteredQueries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleRowClick = (id: string) => {
    navigate(`${paths.QUERY_DETAILS}?id=${id}`);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white border rounded-lg shadow-lg space-y-8">
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
          {paginatedQueries.map((query) => (
            <TableRow
              key={query._id}
              onClick={() => handleRowClick(query._id)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <TableCell>{query.natural_language_query}</TableCell>
              <TableCell>{new Date(query.timestamp).toLocaleString()}</TableCell>
              <TableCell>
                {query.is_valid ? (
                  <span className="text-green-500">✔️</span>
                ) : (
                  <span className="text-red-500">❌</span>
                )}
              </TableCell>
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

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              currentPage * pageSize < filteredQueries.length ? prev + 1 : prev
            )
          }
          disabled={currentPage * pageSize >= filteredQueries.length}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default QueryListTable;
