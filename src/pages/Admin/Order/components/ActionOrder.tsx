import { updateStatus } from "@/api/order";
import Button from "@/components/Control/Button";
import {
  DELETE_QUESTION,
  DELETE_QUESTION_CONFIRMATION,
  ORDER_APPROVED,
  ORDER_CANCEL,
} from "@/constant/messages";
import useBanner from "@/hook/useBanner";
import { OrderSchema, UpdateOrder } from "@/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdOutlineCancel, MdOutlineCheckCircleOutline } from "react-icons/md";

type Props = {
  order: OrderSchema | null;
  action: string;
  toggleModal: () => void;
};

const ActionOrder = ({ order, action, toggleModal }: Props) => {
  if (!order) return null;
  const banner = useBanner();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      if (action === "payed") {
        banner.simpleSuccess(ORDER_APPROVED);
      } else {
        banner.simpleSuccess(ORDER_CANCEL);
      }
      toggleModal();
      queryClient.refetchQueries({ queryKey: ["getOrderPaginated"] });
    },
    onError: (error) => {
      banner.simpleError(error);
    },
  });

  const handleClick = () => {
    const data: UpdateOrder = {
      id: order._id,
      body: {
        status: action,
      },
    };
    mutate(data);
  };

  const icon =
    action === "payed" ? (
      <MdOutlineCheckCircleOutline className="text-green-600 text-9xl" />
    ) : (
      <MdOutlineCancel className="text-red-600 text-9xl" />
    );
  const text = action === "payed" ? "Si, aceptar" : "Si, cancelar";

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {icon}
      <h2 className="text-gray-800 text-2xl">{DELETE_QUESTION}</h2>
      <h2 className="text-gray-800 text-xl">{DELETE_QUESTION_CONFIRMATION}</h2>
      <div className="flex gap-2">
        <Button
          variant={`${action === "payed" ? "dark" : "danger"}`}
          importantClass="!w-auto !min-w-28 px-[11px] py-[5px]"
          label={text}
          disabled={isPending}
          loading={isPending}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default ActionOrder;
