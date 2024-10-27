import { useState } from "react";

function usePagination(data: any[], itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(0);

  const maxPage = Math.ceil(data?.length / itemsPerPage);

  function getCurrentData() {
    if (!Array.isArray(data)) {
      return [];
    }
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }

  function handleGoToPage(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function handleNextPage() {
    if (currentPage < maxPage - 1) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  }

  function handlePrevPage() {
    if (currentPage > 0) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  }

  return {
    getCurrentData,
    handleGoToPage,
    handleNextPage,
    handlePrevPage,
    currentPage,
    maxPage,
  };
}

export default usePagination;
