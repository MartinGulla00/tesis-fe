import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const SchemaSelectionModal = ({ schemas = [], onSelect, onClose }) => (
  <Dialog open={true} onOpenChange={onClose}>
    <DialogContent className="max-h-[90%] overflow-scroll bg-white shadow-lg rounded-lg border border-gray-200">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-gray-800">Seleccionar Esquema</DialogTitle>
      </DialogHeader>
      <ul className="space-y-2 mt-4">
        {schemas.map((schema, index) => {
          const filenameWithoutExtension = schema.filename.split(".")[0];
          const displayName = filenameWithoutExtension.split("_").slice(1).join("_");
          return (
            <li key={index}>
              <Button
                onClick={() => onSelect(schema)}
                className="w-full text-left px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 transition"
              >
                {displayName}
              </Button>
            </li>
          );
        })}
      </ul>
    </DialogContent>
  </Dialog>
);

export default SchemaSelectionModal;
