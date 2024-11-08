import { useState } from "react";

const useTableServerSide = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  return {
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    tableState: {
      pagination,
      setPagination,
      sorting,
      setSorting,
      columnFilters,
      setColumnFilters,
    },
  }
}

export default useTableServerSide
