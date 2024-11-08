import { useState } from "react";
import Dialog from "../../../components/Common/Dialog/Dialog";
import TableServerSide from "../../../components/Tables/ServerSide/TableServerSide";
import useTableServerSide from "../../../components/Tables/ServerSide/useTableServerSide";
import useGetUserPaginatedQuery from "../../../hook/Queries/useGetUserPaginatedQuery";
import parseObjectToQueryUrl from "../../../utils/parseObjectToQueryUrl";
import useUsersColumns from "./hooks/useUsersColumns";
import FormUser from "../../../components/Admin/User/FormUser";
import { User } from "../../../types/user";
import Button from "../../../components/Control/Button";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../../api/user";
import useBanner from "../../../hook/useBanner";
import DeleteDialog from "../../../components/Common/DeleteDialog";
import { DELETED_SUCCESSFULLY } from "../../../constant/messages";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const banner = useBanner();
  const [itemSelected, setItemSelected] = useState<User | null>(null);
  const { tableState, pageNumber } = useTableServerSide();
  const { data, isLoading, isError, refetch } = useGetUserPaginatedQuery({
    queryPath: `?${parseObjectToQueryUrl({ page: pageNumber })}`,
  });

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

  const { mutate, isPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      refetch();
      setOpenDeleteDialog(false);
      banner.simpleSuccess(DELETED_SUCCESSFULLY);
    },
    onError: (error) => {
      banner.simpleError(error);
    },
  });
  const handleDelete = () => {
    if (itemSelected?.id) mutate(itemSelected?.id);
  };

  const columnsDef = useUsersColumns({ onDeleteClick, onEditClick });

  return (
    <>
      <div className="flex items-end justify-end mb-4">
        <Button
          variant="light"
          label="Add new"
          importantClass="!w-28"
          onClick={addNew}
        />
      </div>
      <TableServerSide
        tableState={tableState}
        columns={columnsDef}
        data={data?.items ?? []}
        pageCount={data?.totalPages ?? 0}
        rowCount={data?.count ?? 0}
        isLoading={isLoading || isError}
        noData={!data?.items.length}
      />
      <Dialog
        open={open}
        closeModal={toggleModal}
        title="Update user"
        hideAcceptButton={true}
        hideCancelButton={true}
      >
        <FormUser item={itemSelected} toggleModal={toggleModal} />
      </Dialog>

      <DeleteDialog
        handleDelete={handleDelete}
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        isDeleting={isPending}
      />
    </>
  );
};

export default Users;
