import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const SchemaSelectionModal = ({ schemas = [], onSelect, onClose }) => (
  <Dialog open={true} onOpenChange={onClose}>
    <DialogContent className="max-h-[90%] overflow-scroll">
      <DialogHeader>
        <DialogTitle>Seleccionar Esquema</DialogTitle>
      </DialogHeader>
      <ul>
        {schemas.map((schema, index) => {
          const filenameWithoutExtension = schema.filename.split(".")[0];
          const displayName = filenameWithoutExtension.split("_").slice(1).join("_"); 
          return (
            <li key={index} className="mb-2">
              <Button onClick={() => onSelect(schema)} className="w-full text-left">
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
