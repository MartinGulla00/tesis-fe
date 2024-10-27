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
    <div className="flex space-x-4 mb-4">
      <Input
        type="text"
        placeholder="Buscar por texto..."
        value={filters.queryText}
        onChange={(e) => handleFilterChange("queryText", e.target.value)}
        className="border p-2 w-full"
      />

      <Select
        value={filters.model}
        onValueChange={(value) => handleFilterChange("model", value)}
      >
        <SelectTrigger className="border p-2 w-full">
          <SelectValue placeholder="Seleccionar Modelo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="vertex">Vertex</SelectItem>
            <SelectItem value="gpt">GPT</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={filters.isValid}
        onValueChange={(value) => handleFilterChange("isValid", value)}
      >
        <SelectTrigger className="border p-2 w-full">
          <SelectValue placeholder="Válido" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="true">Sí</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default QueryFilters;
