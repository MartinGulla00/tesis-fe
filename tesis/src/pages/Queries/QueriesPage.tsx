import React, { useEffect, useState } from "react";
import axios from "axios";
import QueryListTable from "@/pages/Queries/QueryListTable";
import QueryFilters from "@/pages/Queries/QueryFilters";
import useToaster from "../../hooks/common/useToaster";

type Filters = {
  queryText: string;
  model: string;
  isValid: "all" | "true" | "false"; 
  date: string; 
  customDateRange?: { start: string; end: string };
};

const QueriesPage: React.FC = () => {
  const [queries, setQueries] = useState<any[]>([]);
  const [filters, setFilters] = useState<Filters>({
    queryText: "",
    model: "",
    isValid: "all",
    date: "all",
  });
  const { showToastError } = useToaster();

  useEffect(() => {
    fetchQueries();
  }, [filters.model]);

  const fetchQueries = async () => {
    try {
      const params: any = {};
      if (filters.model) {
        params.model = filters.model.trim();
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_API}/api/queries/detail`,
        { params }
      );

      if (response.status !== 200 || !response.data) {
        showToastError(null, "Error al obtener las consultas");
        return;
      }
      setQueries(response.data);
    } catch (error) {
      console.error("Error al obtener las consultas:", error);
      showToastError(error, "Error al obtener las consultas");
    }
  };

  const updateQueryValidity = async (id: string, isValid: boolean) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_SERVER_API}/api/queries/${id}`,
        { is_valid: isValid }
      );

      if (response.status !== 200) {
        showToastError(null, "Error al actualizar la validez de la consulta");
        return;
      }

      setQueries((prevQueries) =>
        prevQueries.map((query) =>
          query._id === id ? { ...query, is_valid: isValid } : query
        )
      );
    } catch (error) {
      console.error("Error al actualizar la validez:", error);
      showToastError(error, "Error al actualizar la validez");
    }
  };

  const calculateDateRange = (date: string): [Date | null, Date | null] => {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    switch (date) {
      case "today":
        return [startOfToday, endOfToday];
      case "this_week":
        return [startOfWeek, endOfToday];
      case "this_month":
        return [startOfMonth, endOfToday];
      default:
        return [null, null];
    }
  };

  const filteredQueries = queries.filter((query) => {
    const { queryText, isValid, date } = filters;

    if (
      queryText &&
      !query.natural_language_query
        .toLowerCase()
        .includes(queryText.toLowerCase())
    ) {
      return false;
    }

    if (isValid !== "all" && query.is_valid !== (isValid === "true")) {
      return false;
    }

    const [startDate, endDate] = calculateDateRange(date);
    if (startDate && endDate) {
      const queryDate = new Date(query.timestamp);
      if (queryDate < startDate || queryDate > endDate) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Página de Consultas</h1>
      <QueryFilters filters={filters} setFilters={setFilters} />
      <QueryListTable
        queries={filteredQueries}
        onUpdateValidity={updateQueryValidity}
      />
    </div>
  );
};

export default QueriesPage;
