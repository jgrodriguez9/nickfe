import { useState } from "react";
import useBanner from "../../../hook/useBanner";
import { Button } from "@/components/ui/button";
import FormProduct from "@/components/Admin/Product/FormProduct";
import Dialog from "@/components/Common/Dialog/Dialog";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const banner = useBanner();
  const [itemSelected, setItemSelected] = useState<any | null>(null);

  const toggleModal = () => setOpen(!open);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditClick = (row: any) => {
    const { original } = row;
    setItemSelected({
      id: original._id,
      name: original.name,
      email: original.email,
      role: original.role,
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

  return (
    <>
      <div className="flex items-end justify-end mb-4">
        <Button variant={"outline"} onClick={addNew}>
          Add new
        </Button>
      </div>

      <Dialog
        open={open}
        closeModal={toggleModal}
        title="Update product"
        hideAcceptButton={true}
        hideCancelButton={true}
        maxWidth={2}
      >
        <FormProduct item={null} toggleModal={toggleModal} />
      </Dialog>
    </>
  );
};

export default Products;
