import { useState } from "react";
import useBanner from "../../../hook/useBanner";
import { Button } from "@/components/ui/button";
import Dialog from "@/components/Common/Dialog/Dialog";
import TableClientSide from "@/components/Tables/TableClientSide";
import useGetDesignQuery from "@/hook/Queries/useGetDesignQuery";
import useDesignColumns from "./hooks/useDesignColumns";
import FormDesign from "@/components/Admin/Design/FormDesign";

const DesignAdmin = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const banner = useBanner();
  const [itemSelected, setItemSelected] = useState<any | null>(null);

  const { data, isLoading, isError, refetch } = useGetDesignQuery();

  const toggleModal = () => setOpen(!open);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditClick = (row: any) => {
    const { original } = row;
    setItemSelected({
      id: original._id,
      sku: original.sku,
      name: original.name,
      imageUrl: original.imageUrl,
      imageId: original.imageId,
      characterId: original.characterId,
      characterName: original.characterName,
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

  const columnsDef = useDesignColumns({ onDeleteClick, onEditClick });

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
        title={`${itemSelected ? "Update design" : "Create design"}`}
        hideAcceptButton={true}
        hideCancelButton={true}
        maxWidth={2}
      >
        <FormDesign item={itemSelected} toggleModal={toggleModal} />
      </Dialog>
    </>
  );
};

export default DesignAdmin;
