import TableServerSide from "@/components/Tables/ServerSide/TableServerSide";
import useTableServerSide from "@/components/Tables/ServerSide/useTableServerSide";
import parseObjectToQueryUrl from "@/utils/parseObjectToQueryUrl";
import { useMemo, useState } from "react";
import useOrdersColumns from "./hook/useOrdersColumns";
import { OrderSchema } from "@/types/order";
import useGetOrdersPaginatedQuery from "@/hook/Queries/useGetOrdersPaginatedQuery";
import Dialog from "@/components/Common/Dialog/Dialog";
import ViewOrder from "./components/ViewOrder";
import ActionOrder from "./components/ActionOrder";
import DatePickerRange from "@/components/Control/DatePickerRange";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import moment from "moment";
import SelectControl, { ValueProps } from "@/components/Control/SelectControl";

const statusOpt = [
  { value: "pending", label: "Pending" },
  { value: "payed", label: "Payed" },
  { value: "cancelled", label: "Cancelled" },
];

type DialogProps = {
  order: OrderSchema | null;
  action: string;
  open: boolean;
};

const OrderAdmin = () => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [status, setStatus] = useState<ValueProps | null>(null);
  const [dialog, setDialog] = useState<DialogProps>({
    action: "",
    open: false,
    order: null,
  });
  const [query, setQuery] = useState({
    startDate: "",
    endDate: "",
    status: "",
  });
  const { tableState, pageNumber } = useTableServerSide();
  const { data, isLoading, isError } = useGetOrdersPaginatedQuery({
    queryPath: `?${parseObjectToQueryUrl({ page: pageNumber, ...query })}`,
  });

  const toggleModal = () =>
    setDialog({
      action: "",
      open: false,
      order: null,
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onHandlePaymentStatus = (row: any, action: string) => {
    const { original } = row;
    setDialog({
      action: action,
      open: true,
      order: original,
    });
  };

  const title = useMemo(() => {
    switch (dialog.action) {
      case "view":
        return "Order detail";
      case "payed":
        return "Apply payment";
      default:
        return "Cancel order";
    }
  }, [dialog.action]);

  const columnsDef = useOrdersColumns({ onHandlePaymentStatus });

  const onHandleSearch = () => {
    const objSearch = { ...query };
    objSearch["startDate"] = date?.from
      ? moment(date.from).format("YYYY-MM-DD")
      : "";
    objSearch["endDate"] = date?.to ? moment(date.to).format("YYYY-MM-DD") : "";
    objSearch["status"] = status?.value ?? "";
    setQuery(objSearch);
  };

  return (
    <>
      <div className="mb-2 flex flex-col lg:flex-row gap-2 justify-end items-center">
        <div>
          <SelectControl
            id="status"
            name="status"
            value={status}
            onChange={(value) => {
              setStatus(value);
            }}
            options={statusOpt}
            placeholder="Payment status"
            clearable={true}
          />
        </div>
        <div className="mb-2">
          <DatePickerRange
            date={date}
            setDate={setDate}
            placeholder="Select range"
          />
        </div>
        <Button
          type="button"
          onClick={onHandleSearch}
          className="mb-2 h-[42px]"
        >
          Search
        </Button>
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
        open={dialog.open}
        closeModal={toggleModal}
        title={title}
        hideAcceptButton={true}
        hideCancelButton={true}
        maxWidth={dialog.action === "view" ? 5 : 1}
      >
        {dialog.action === "view" && <ViewOrder order={dialog.order} />}
        {dialog.action !== "view" && (
          <ActionOrder
            order={dialog.order}
            action={dialog.action}
            toggleModal={toggleModal}
          />
        )}
      </Dialog>
    </>
  );
};

export default OrderAdmin;
