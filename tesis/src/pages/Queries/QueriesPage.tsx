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
    isValid: "",
  });
  const { showToastError } = useToaster();

  useEffect(() => {
    fetchQueries();
  }, [filters]);

  const fetchQueries = async () => {
    try {
      const params: any = {};

      if (filters.queryText && filters.queryText.trim() !== "") {
        params.context = filters.queryText;
      }
      if (filters.model && filters.model.trim() !== "") {
        params.model = filters.model;
      }
      if (filters.isValid && filters.isValid.trim() !== "") {
        params.is_valid = filters.isValid === "true";
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
      console.log("da error");
      showToastError(error, "Error fetching queries");
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
