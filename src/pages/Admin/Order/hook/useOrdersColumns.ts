/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import CellDate from "@/components/Tables/Cell/CellDate";
import OrderCell from "../components/OrderCell";
import CellStatus from "@/components/Tables/Cell/CellStatus";
import OrderActionsCell from "../components/OrderActionsCell";

type Props = {
   onHandlePaymentStatus: (row: any, action: string) => void
}

const useOrdersColumns = ({ onHandlePaymentStatus }: Props) => {

  const columnDef = useMemo(() => {
    const columnHelper = createColumnHelper();
    return [
      columnHelper.accessor('code', {header: 'Code'}),      
      columnHelper.accessor('createdAt', {header: 'Date', cell: CellDate}),
      columnHelper.accessor('status', {header: 'Payment', cell: CellStatus}),
      columnHelper.display({
        id: 'qty', 
        header: 'Qty',
        cell: ({ row }) => OrderCell({row, type: 'qty'}),
      }),
      columnHelper.display({
        id: 'amount', 
        header: 'Amount',
        cell: ({ row }) => OrderCell({row, type: 'amount'}),
      }),
      columnHelper.display({
        id: 'Actions',
        header: 'Acciones',
        cell: ({ row }) => OrderActionsCell({ row, onHandlePaymentStatus}) }),
    ]}, [onHandlePaymentStatus]);
  
  return columnDef;
}
  
export default useOrdersColumns;