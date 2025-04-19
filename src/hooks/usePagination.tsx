import { useState } from "react";

const usePagination = (initialPage = 1, initialLimit = 10) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page if limit changes
  };

  return {
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    skip: (page - 1) * limit,
  };
};

export default usePagination;
