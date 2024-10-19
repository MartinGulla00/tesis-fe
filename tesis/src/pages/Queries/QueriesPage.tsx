import React, { useEffect, useState } from "react";
import axios from "axios";
import QueryListTable from  "@/pages/Queries/QueryListTable";

const QueriesPage: React.FC = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/queries");
      setQueries(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Página de Consultas</h1>
      <QueryListTable queries={queries} />
    </div>
  );
};

export default QueriesPage;
