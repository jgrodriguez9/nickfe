/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import TablePagination from "../Pagination/TablePagination";
import TableHead from "../TableHead/TableHead";
import TableBody from "../TableBody/TableBody";

type TableServerSideProps = {
  data: any;
  columns: any;
  rowCount: number;
  pageCount: number;
  tableState: any;
  isLoading: boolean;
  noData: boolean;
};

const TableServerSide = ({
  data,
  columns,
  rowCount,
  pageCount,
  tableState,
  isLoading,
  noData,
}: TableServerSideProps) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    onPaginationChange: tableState.setPagination,
    onSortingChange: tableState.setSorting,
    onColumnFiltersChange: tableState.setColumnFilters,
    state: {
      pagination: tableState.pagination,
      sorting: tableState.sorting,
      columnFilters: tableState.columnFilters,
    },
    rowCount: rowCount,
    pageCount: pageCount,
  });

  return (
    <div className="w-100 relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700">
        <TableHead table={table} />
        <TableBody table={table} isLoading={isLoading} noData={noData} />
      </table>
      <TablePagination table={table} />
    </div>
  );
};

export default TableServerSide;
