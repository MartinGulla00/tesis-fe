import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  currentPage: number;
  maxPage: number;
  onPrevious: () => void;
  onNext: () => void;
};

const PaginationControls: React.FC<Props> = ({
  currentPage,
  maxPage,
  onPrevious,
  onNext,
}: Props) => {
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationPrevious onClick={onPrevious} />
        <PaginationItem className="px-3 py-1">
          Página {currentPage + 1} de {maxPage}
        </PaginationItem>
        <PaginationNext onClick={onNext} />
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
