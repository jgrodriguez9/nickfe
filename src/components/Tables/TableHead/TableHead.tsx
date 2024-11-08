import { flexRender, Table } from "@tanstack/react-table";

type TableHeadProps = {
  table: Table<unknown>;
};
const TableHead = ({ table }: TableHeadProps) => {
  return (
    <thead className="text-zinc-500">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                scope="col"
                className="px-4 py-2 border-b border-b-zinc-950/10 font-medium last:text-right"
              >
                <div>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default TableHead;
