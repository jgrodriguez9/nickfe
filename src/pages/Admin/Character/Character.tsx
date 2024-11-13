import { useState } from "react";
import useBanner from "../../../hook/useBanner";
import { Button } from "@/components/ui/button";
import Dialog from "@/components/Common/Dialog/Dialog";
import TableClientSide from "@/components/Tables/TableClientSide";
import useGetCharacterQuery from "@/hook/Queries/useGetCharacterQuery";
import FormCharacter from "@/components/Admin/Character/FormCharacter";
import useCharacterColumns from "./hooks/useCharacterColumns";

const Character = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const banner = useBanner();
  const [itemSelected, setItemSelected] = useState<any | null>(null);

  const { data, isLoading, isError, refetch } = useGetCharacterQuery();

  const toggleModal = () => setOpen(!open);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditClick = (row: any) => {
    const { original } = row;
    setItemSelected({
      id: original._id,
      name: original.name,
      imageUrl: original.imageUrl,
      imageId: original.imageId,
    });
    toggleModal();
  };
  const onDeleteClick = (id: string) => {
    setItemSelected({
      id: id,
      email: "",
      name: "",
      role: "",
    });
    setOpenDeleteDialog(true);
  };

  const addNew = () => {
    setItemSelected(null);
    toggleModal();
  };

  const columnsDef = useCharacterColumns({ onDeleteClick, onEditClick });

  return (
    <>
      <div className="flex items-end justify-end mb-4">
        <Button variant={"outline"} onClick={addNew}>
          Add new
        </Button>
      </div>
      <TableClientSide columns={columnsDef} data={data?.items ?? []} />

      <Dialog
        open={open}
        closeModal={toggleModal}
        title={`${itemSelected ? "Update character" : "Create character"}`}
        hideAcceptButton={true}
        hideCancelButton={true}
        maxWidth={2}
      >
        <FormCharacter item={itemSelected} toggleModal={toggleModal} />
      </Dialog>
    </>
  );
};

export default Character;
