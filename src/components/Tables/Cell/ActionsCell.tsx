/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";

type ActionsCellProps = {
  row: any;
  onEditClick: (row: any) => void;
  onDeleteClick: (id: string) => void | null;
};

const ActionsCell = ({ row, onEditClick, onDeleteClick }: ActionsCellProps) => {
  const id = row.original._id;

  return (
    <div className="flex justify-end gap-1 items-center">
      {onEditClick && (
        <button
          id={`action-edit-${id}`}
          aria-label={`action-edit-${id}`}
          title="Editar"
          className="p-2 text-gray-900 hover:text-gray-600 text-lg"
          onClick={() => onEditClick(row)}
          type="button"
        >
          <FaPenToSquare />
        </button>
      )}
      {onDeleteClick && (
        <button
          id={`action-delete-${id}`}
          aria-label={`action-delete-${id}`}
          title="Eliminar"
          className="p-2 text-red-500 hover:text-red-300 text-lg"
          onClick={() => onDeleteClick(id)}
          type="button"
        >
          <FaTrashCan />
        </button>
      )}
    </div>
  );
};

export default ActionsCell;
