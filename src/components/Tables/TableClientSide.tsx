/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import TableHead from "./TableHead/TableHead";
import TableBody from "./TableBody/TableBody";
import TablePagination from "./Pagination/TablePagination";

type TableClientSideProps = {
  data: any;
  columns: any;
};

const TableClientSide = ({ data, columns }: TableClientSideProps) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="w-100 relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700">
        <TableHead table={table} />
        <TableBody table={table} />
      </table>
      <TablePagination table={table} />
    </div>
  );
};

export default TableClientSide;
