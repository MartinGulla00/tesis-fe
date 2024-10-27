import React, { ChangeEvent, useRef } from 'react';

interface SchemaUploadProps {
  onDatabaseSchemaChange: (file: File | null) => void;
}

const SchemaUpload: React.FC<SchemaUploadProps> = ({ onDatabaseSchemaChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      if (selectedFile.type !== 'application/sql' && !selectedFile.name.endsWith('.sql')) {
        alert('Please select a valid SQL file.');
        return;
      }

      onDatabaseSchemaChange(selectedFile);
      alert('Database Schema file selected correctly!');
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
        style={{ display: 'none' }}
      />
      <button
        type="button"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-fit"
        onClick={handleButtonClick}
      >
        Enter Database Schema
      </button>
    </>
  );
};

export default SchemaUpload;
