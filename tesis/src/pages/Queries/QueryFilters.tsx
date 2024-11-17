import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  filters: any;
  setFilters: (filters: any) => void;
};

const QueryFilters: React.FC<Props> = ({ filters, setFilters }) => {
  const handleFilterChange = (field: string, value: any) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <div className="flex flex-col space-y-4 mb-4">
      <Input
        type="text"
        placeholder="Consulta en lenguaje natural..."
        value={filters.queryText}
        onChange={(e) => handleFilterChange("queryText", e.target.value)}
        className="border p-2 w-full h-12"

      />

      <div className="flex space-x-4">
        <div className="flex-1">
          <label id="model-label" className="block text-sm font-medium text-gray-700 mb-1">
            Modelo
          </label>
          <Select
            aria-labelledby="model-label"
            value={filters.model}
            onValueChange={(value) => handleFilterChange("model", value)}
          >
            <SelectTrigger className="border p-2 w-full flex items-center">
              <SelectValue placeholder="Seleccionar Modelo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="vertex">Vertex</SelectItem>
                <SelectItem value="gpt">GPT</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label id="validity-label" className="block text-sm font-medium text-gray-700 mb-1">
            Validez
          </label>
          <Select
            aria-labelledby="validity-label"
            value={filters.isValid === "all" ? "all" : filters.isValid}
            onValueChange={(value) =>
              handleFilterChange(
                "isValid",
                value === "true" ? true : value === "false" ? false : "all"
              )
            }
          >
            <SelectTrigger className="border p-2 w-full flex items-center">
              <SelectValue placeholder="Seleccionar Validez" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="true">Valida</SelectItem>
                <SelectItem value="false">No Valida</SelectItem>
                <SelectItem value="all">Todos</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500 mt-1">
            "Todos" muestra tanto consultas válidas como no válidas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QueryFilters;
