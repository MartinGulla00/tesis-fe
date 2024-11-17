import React, { ChangeEvent, useRef } from "react";

interface SchemaUploadProps {
  onDatabaseSchemaChange: (file: File | null) => void;
}

const SchemaUpload: React.FC<SchemaUploadProps> = ({ onDatabaseSchemaChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      if (selectedFile.type !== "application/sql" && !selectedFile.name.endsWith(".sql")) {
        alert("Debe seleccionar un archivo SQL válido.");
        return;
      }

      onDatabaseSchemaChange(selectedFile);
    } else {
      onDatabaseSchemaChange(null);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".sql"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button
        type="button"
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-md shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        onClick={handleButtonClick}
      >
        Subir Esquema SQL
      </button>
    </>
  );
};

export default SchemaUpload;
