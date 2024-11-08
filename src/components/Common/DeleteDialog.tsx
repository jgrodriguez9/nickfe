import {
  DELETE_QUESTION,
  DELETE_QUESTION_CONFIRMATION,
} from "../../constant/messages";
import Button from "../Control/Button";
import Dialog from "./Dialog/Dialog";
import { GoAlert } from "react-icons/go";

type Props = {
  handleDelete: () => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  isDeleting: boolean;
};
const DeleteDialog = ({ handleDelete, open, setOpen, isDeleting }: Props) => {
  const toggleModal = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      closeModal={toggleModal}
      title=""
      hideAcceptButton={true}
      hideCancelButton={true}
    >
      <div className="flex flex-col gap-4 items-center justify-center">
        <GoAlert className="text-yellow-600 text-9xl" />
        <h2 className="text-gray-800 text-2xl">{DELETE_QUESTION}</h2>
        <h2 className="text-gray-800 text-xl">
          {DELETE_QUESTION_CONFIRMATION}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="danger"
            importantClass="!w-auto !min-w-28 px-[11px] py-[5px]"
            label="Si, eliminarlo"
            disabled={isDeleting}
            loading={isDeleting}
            onClick={handleDelete}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
