import {
  MdClose,
  MdOutlineCreditScore,
  MdOutlineRemoveRedEye,
} from "react-icons/md";

type CellProps = {
  row: any;
  onHandlePaymentStatus: (row: any, action: string) => void;
};
const OrderActionsCell = ({ row, onHandlePaymentStatus }: CellProps) => {
  const id = row.original._id;

  return (
    <div className="flex justify-end gap-1 items-center">
      <button
        id={`action-edit-${id}`}
        aria-label={`action-edit-${id}`}
        title="Editar"
        className="px-2 py-1 border border-blue-400 bg-blue-500 rounded-sm text-white hover:bg-blue-400 text-lg"
        onClick={() => onHandlePaymentStatus(row, "view")}
        type="button"
      >
        <MdOutlineRemoveRedEye />
      </button>
      <button
        id={`action-edit-${id}`}
        aria-label={`action-edit-${id}`}
        title="Editar"
        className="px-2 py-1 border border-green-400 bg-green-500 rounded-sm text-white hover:bg-green-400 text-lg"
        onClick={() => onHandlePaymentStatus(row, "payed")}
        type="button"
      >
        <MdOutlineCreditScore />
      </button>
      <button
        id={`action-edit-${id}`}
        aria-label={`action-edit-${id}`}
        title="Editar"
        className="px-2 py-1 border border-red-400 bg-red-500 rounded-sm text-white hover:bg-red-400 text-lg"
        onClick={() => onHandlePaymentStatus(row, "cancelled")}
        type="button"
      >
        <MdClose />
      </button>
    </div>
  );
};

export default OrderActionsCell;
