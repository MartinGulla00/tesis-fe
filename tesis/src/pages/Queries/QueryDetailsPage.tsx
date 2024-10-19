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
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-brand-green">Detalles de la Consulta</h1>
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-gray-700 font-semibold">ID:</p>
          <p className="text-gray-800">{query._id}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-gray-700 font-semibold">Consulta en Lenguaje Natural:</p>
          <p className="text-gray-800">{query.natural_language_query}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-gray-700 font-semibold">SQL Generado:</p>
          <pre className="text-gray-800 bg-gray-200 p-2 rounded-md overflow-x-auto">
            {query.sql_query_generated}
          </pre>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-gray-700 font-semibold">Fecha:</p>
          <p className="text-gray-800">{new Date(query.timestamp).toLocaleString()}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-gray-700 font-semibold">Válida:</p>
          <p className={`font-bold ${query.is_valid ? "text-green-600" : "text-red-600"}`}>
            {query.is_valid ? "Sí" : "No"}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-gray-700 font-semibold">Modelo:</p>
          <p className="text-gray-800">{query.model}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-gray-700 font-semibold">User ID:</p>
          <p className="text-gray-800">{query.user_id || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default QueryDetailsPage;
