import { useState } from "react";
import useBanner from "../../../hook/useBanner";
import { Button } from "@/components/ui/button";
import Dialog from "@/components/Common/Dialog/Dialog";
import TableClientSide from "@/components/Tables/TableClientSide";
import useGetTechniqueQuery from "@/hook/Queries/useGetTechniqueQuery";
import useTechniqueColumns from "./hooks/useTechniqueColumns";
import FormTechnique from "@/components/Admin/Technique/FormTechnique";

const TechniqueAdmin = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const banner = useBanner();
  const [itemSelected, setItemSelected] = useState<any | null>(null);

  const { data, isLoading, isError, refetch } = useGetTechniqueQuery();

  const toggleModal = () => setOpen(!open);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditClick = (row: any) => {
    const { original } = row;
    setItemSelected({
      id: original._id,
      name: original.name,
      nameEng: original.nameEng,
      price: original.price,
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

  const columnsDef = useTechniqueColumns({ onDeleteClick, onEditClick });

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
        <FormTechnique item={itemSelected} toggleModal={toggleModal} />
      </Dialog>
    </>
  );
};

export default TechniqueAdmin;
