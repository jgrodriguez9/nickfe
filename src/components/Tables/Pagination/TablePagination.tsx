import {
  FaAnglesLeft,
  FaAnglesRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa6";

import SelectPagination from "./SelectPagination";
import { Table } from "@tanstack/react-table";

type TablePaginationProps = {
  table: Table<unknown>;
};

const buttonClassEnabled = "border rounded p-2  text-gray-700 w-8";
const buttonClassDisabled = "border rounded p-2  text-gray-400 w-8";

const getPagesOptions = (totalPages: number) =>
  new Array(totalPages)
    .fill("")
    .map((_, index) => ({ key: index.toString(), desc: index + 1 }));
const getRowsPerPageOptions = () =>
  [10, 20, 30, 40, 50].map((size) => ({ key: size.toString(), desc: size }));

const TablePagination = ({ table }: TablePaginationProps) => {
  const actualPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;

  const disabledPrevious = !table.getCanPreviousPage();
  const disabledNext = !table.getCanNextPage();

  const buttonClassPrevious = disabledPrevious
    ? buttonClassDisabled
    : buttonClassEnabled;
  const buttonClassNext = disabledNext
    ? buttonClassDisabled
    : buttonClassEnabled;

  return (
    <div className="flex items-center justify-end gap-6 mt-4">
      <div className="flex gap-2">
        <SelectPagination
          id="rows"
          title="Filas:"
          value={pageSize}
          onChange={(size: string) => table.setPageSize(Number(size))}
          options={getRowsPerPageOptions()}
        />
        <SelectPagination
          id="go-to-page"
          title="Ir a página:"
          value={actualPage}
          onChange={(page: string) => table.setPageIndex(Number(page) - 1)}
          options={getPagesOptions(totalPages)}
        />
      </div>
      <div className="flex gap-2">
        <button
          className={buttonClassPrevious}
          onClick={() => table.firstPage()}
          disabled={disabledPrevious}
          type="button"
        >
          <FaAnglesLeft />
        </button>
        <button
          className={buttonClassPrevious}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          type="button"
        >
          <FaAngleLeft />
        </button>
        <span className="flex items-center gap-1">
          <div>Página</div>
          <strong>{`${totalPages ? actualPage : 0} de ${totalPages}`}</strong>
        </span>
        <button
          className={buttonClassNext}
          onClick={() => table.nextPage()}
          disabled={disabledNext}
          type="button"
        >
          <FaAngleRight />
        </button>
        <button
          className={buttonClassNext}
          onClick={() => table.lastPage()}
          disabled={disabledNext}
          type="button"
        >
          <FaAnglesRight />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
