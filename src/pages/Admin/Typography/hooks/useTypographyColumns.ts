/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import ActionsCell from "../../../../components/Tables/Cell/ActionsCell";
import CellImage from "@/components/Tables/Cell/CellImage";

type Props = {
    onEditClick: (row: any) => void
    onDeleteClick: (id: string) => void
}

const useTypographyColumns = ({ onEditClick, onDeleteClick }: Props) => {

  const columnDef = useMemo(() => {
    const columnHelper = createColumnHelper();
    return [
      columnHelper.accessor('imageUrl', {header: 'Imagen', cell: CellImage}),
      columnHelper.accessor('name', {header: 'Name'}),
      columnHelper.accessor('characterName', {header: 'Character'}),        
      columnHelper.display({
        id: 'Actions',
        header: 'Acciones',
        cell: ({ row }) => ActionsCell({ row, onEditClick, onDeleteClick}) }),
    ]}, [onEditClick, onDeleteClick]);
  
  return columnDef;
}
  
export default useTypographyColumns;