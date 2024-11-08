import { flexRender, Table } from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";

type TableBodyProps = {
  table: Table<unknown>;
  isLoading?: boolean;
  noData?: boolean;
};

type CellProps = {
  children: React.ReactNode;
  colSpan?: number;
};

type RowProps = {
  children: React.ReactNode;
};

type NoDataToDisplayProps = {
  colSpan: number;
};

const getArray = (size: number) => [...Array(size)].map((_, i) => i);

const Cell = ({ children, colSpan = 1 }: CellProps) => (
  <td
    className="px-4 py-2 border-b border-zinc-950/5 text-[14px] font-medium text-zinc-600 last:text-right"
    colSpan={colSpan}
  >
    {children}
  </td>
);
const Row = ({ children }: RowProps) => (
  <tr className="bg-white hover:bg-zinc-950/[2.5%]">{children}</tr>
);
const Body = ({ children }: RowProps) => (
  <tbody className="divide-y divide-solid font-semibold text-gray-700 text-xs">
    {children}
  </tbody>
);
const NoDataToDisplay = ({ colSpan }: NoDataToDisplayProps) => (
  <Body>
    <Row>
      <Cell colSpan={colSpan}>No hay información disponible...</Cell>
    </Row>
  </Body>
);

const TableBody = ({ table, isLoading = false, noData }: TableBodyProps) => {
  const pageSize = table.getState().pagination.pageSize;
  const columnsCount = table.getAllColumns().length;

  const dataRows = table.getRowModel().rows.map((row) => {
    return (
      <Row key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <Cell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Cell>
        ))}
      </Row>
    );
  });

  const loadingRows = getArray(pageSize).map((item) => (
    <Row key={item}>
      {getArray(columnsCount).map((item) => (
        <Cell key={item}>
          <Skeleton />
        </Cell>
      ))}
    </Row>
  ));

  if (!isLoading && noData) return <NoDataToDisplay colSpan={columnsCount} />;

  return <Body>{isLoading ? loadingRows : dataRows}</Body>;
};

export default TableBody;
