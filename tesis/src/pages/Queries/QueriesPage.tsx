import React, { useEffect, useState } from "react";
import axios from "axios";
import QueryListTable from "@/pages/Queries/QueryListTable";
import QueryFilters from "@/pages/Queries/QueryFilters";

const QueriesPage: React.FC = () => {
  const [queries, setQueries] = useState([]);
  const [filters, setFilters] = useState({
    queryText: "",
    model: "",
    isValid: "",
  });

  useEffect(() => {
    fetchQueries();
  }, [filters]);

  const fetchQueries = async () => {
    try {
      const params: any = {};
      if (filters.queryText) {
        params.context = filters.queryText;
      }
      if (filters.model) {
        params.model = filters.model;
      }
      if (filters.isValid) {
        params.is_valid = filters.isValid === "true"; 
      }

      const response = await axios.get("http://127.0.0.1:8000/queries", { params });
      setQueries(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Página de Consultas</h1>
      <QueryFilters filters={filters} setFilters={setFilters} />
      <QueryListTable queries={queries} />
    </div>
  );
};

export default QueriesPage;
