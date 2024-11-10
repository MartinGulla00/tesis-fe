import React, { useEffect, useState } from "react";
import axios from "axios";
import QueryListTable from "@/pages/Queries/QueryListTable";
import QueryFilters from "@/pages/Queries/QueryFilters";
import useToaster from "../../hooks/common/useToaster";

const QueriesPage: React.FC = () => {
  const [queries, setQueries] = useState([]);
  const [filters, setFilters] = useState({
    queryText: "",
    model: "",
    isValid: "all",
  });
  const { showToastError } = useToaster();

  useEffect(() => {
    fetchQueries();
  }, [filters.model]);

  const fetchQueries = async () => {
    try {
      const params: any = {};

      if (filters.model && filters.model.trim() !== "") {
        params.model = filters.model;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_API}/api/queries/detail`,
        {
          params,
        }
      );

      if (!response.data || response.status !== 200) {
        showToastError(null, "Error fetching queries");
        return;
      }
      setQueries(response.data);
    } catch (error) {
      console.error("Error fetching queries:", error);
      showToastError(error, "Error fetching queries");
    }
  };

  const updateQueryValidity = async (id: string, isValid: boolean) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_SERVER_API}/api/queries/${id}`,
        { is_valid: isValid }
      );

      if (response.status !== 200) {
        showToastError(null, "Error updating query");
        return;
      }

      setQueries((prevQueries) =>
        prevQueries.map((query) =>
          query._id === id ? { ...query, is_valid: isValid } : query
        )
      );
    } catch (error) {
      console.error("Error updating query validity:", error);
      showToastError(error, "Error updating query");
    }
  };

  const filteredQueries = queries
    .filter((query) =>
      query.natural_language_query
        .toLowerCase()
        .includes(filters.queryText.toLowerCase())
    )
    .filter((query) =>
      filters.isValid === "all" ? true : query.is_valid === filters.isValid
    );

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
