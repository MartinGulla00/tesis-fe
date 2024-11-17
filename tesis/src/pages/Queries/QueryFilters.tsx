import React, { useState } from "react";

type Filters = {
  queryText: string;
  model: string;
  isValid: "all" | "true" | "false"; 
  date: string;
  customDateRange?: { start: string; end: string };
};

type Props = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
};

const QueryFilters: React.FC<Props> = ({ filters, setFilters }) => {
  const [customDateRange, setCustomDateRange] = useState(
    filters.customDateRange || { start: "", end: "" }
  );

  const handleFilterChange = (field: keyof Filters, value: any) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleCustomDateChange = (field: "start" | "end", value: string) => {
    const updatedRange = { ...customDateRange, [field]: value };
    setCustomDateRange(updatedRange);
    handleFilterChange("customDateRange", updatedRange);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white border rounded-lg shadow-lg space-y-8 mb-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-gray-700">Filtros de Consultas</h3>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={() =>
            setFilters({
              queryText: "",
              model: "",
              isValid: "all",
              date: "all",
              customDateRange: { start: "", end: "" },
            })
          }
        >
          Limpiar Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Buscar Consulta
          </label>
          <input
            type="text"
            placeholder="Ejemplo: ¿Cuál es el clima hoy?"
            value={filters.queryText}
            onChange={(e) => handleFilterChange("queryText", e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Modelo</label>
          <select
            value={filters.model}
            onChange={(e) => handleFilterChange("model", e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar Modelo</option>
            <option value="vertex">Vertex</option>
            <option value="gpt">GPT</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Validez</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="isValid"
                value="all"
                checked={filters.isValid === "all"}
                onChange={(e) => handleFilterChange("isValid", e.target.value)}
                className="mr-2"
              />
              Todos
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="isValid"
                value="true"
                checked={filters.isValid === "true"}
                onChange={(e) => handleFilterChange("isValid", e.target.value)}
                className="mr-2"
              />
              Válidos
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="isValid"
                value="false"
                checked={filters.isValid === "false"}
                onChange={(e) => handleFilterChange("isValid", e.target.value)}
                className="mr-2"
              />
              No Válidos
            </label>
          </div>
        </div>

        <div
          className={`flex flex-col p-4 rounded-lg ${
            filters.date === "custom" ? "border-2 border-blue-500 shadow-md" : ""
          }`}
        >
          <label className="text-sm font-medium text-gray-700 mb-2">Fecha</label>
          <select
            value={filters.date}
            onChange={(e) => handleFilterChange("date", e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas</option>
            <option value="today">Hoy</option>
            <option value="this_week">Esta Semana</option>
            <option value="this_month">Este Mes</option>
            <option value="custom">Personalizado</option>
          </select>

          {filters.date === "custom" && (
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex-1 min-w-[150px]">
                <label className="text-sm text-gray-600 mb-1 block">Desde</label>
                <input
                  type="date"
                  value={customDateRange.start}
                  onChange={(e) => handleCustomDateChange("start", e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="text-sm text-gray-600 mb-1 block">Hasta</label>
                <input
                  type="date"
                  value={customDateRange.end}
                  onChange={(e) => handleCustomDateChange("end", e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueryFilters;
