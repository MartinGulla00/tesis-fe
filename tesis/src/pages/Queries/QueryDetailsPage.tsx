import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const QueryDetailsPage: React.FC = () => {
  const [query, setQuery] = useState(null);
  const location = useLocation();
  const queryId = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    if (queryId) {
      fetchQueryDetails(queryId);
    }
  }, [queryId]);

  const fetchQueryDetails = async (id: string) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/queries?id=${id}`);
      setQuery(response.data);
    } catch (error) {
      console.error("Error fetching query details:", error);
    }
  };

  if (!query) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalles de la Consulta</h1>
      <p>ID: {query._id}</p>
      <p>Consulta en Lenguaje Natural: {query.natural_language_query}</p>
      <p>SQL Generado: {query.sql_query_generated}</p>
      <p>Fecha: {new Date(query.timestamp).toLocaleString()}</p>
      <p>Válida: {query.is_valid ? "Sí" : "No"}</p>
      <p>Modelo: {query.model}</p>
      <p>User ID: {query.user_id || "N/A"}</p>
    </div>
  );
};

export default QueryDetailsPage;
