/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import ActionsCell from "../../../../components/Tables/Cell/ActionsCell";

type Props = {
    onEditClick: (row: any) => void
    onDeleteClick: (id: string) => void
}

const useUsersColumns = ({ onEditClick, onDeleteClick }: Props) => {

  const columnDef = useMemo(() => {
    const columnHelper = createColumnHelper();
    return [
      columnHelper.accessor('name', {header: 'Nombre'}),      
      columnHelper.accessor('email', {header: 'Correo Electronico'}),
      columnHelper.accessor('role', {header: 'Role'}),
      columnHelper.display({
        id: 'Actions',
        header: 'Acciones',
        cell: ({ row }) => ActionsCell({ row, onEditClick, onDeleteClick}) }),
    ]}, [onEditClick, onDeleteClick]);
  
  return columnDef;
}
  
export default useUsersColumns;