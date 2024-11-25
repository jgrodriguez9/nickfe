import { OrdersSchema } from "@/types/order";
import { formatNumber } from "@/utils/jsFormatNumber";

type CellProps = {
  row: any;
  type: string;
};

const OrderCell = ({ row, type }: CellProps) => {
  switch (type) {
    case "qty":
      return row.original.orders.reduce(
        (acc: number, curr: OrdersSchema) => acc + curr.qty,
        0
      );
    case "amount":
      const amount = row.original.orders.reduce(
        (acc: number, curr: OrdersSchema) =>
          acc + (curr.technique.price + curr.product.price) * curr.qty,
        0
      );
      return formatNumber(amount);
    default:
      return null;
  }
};

export default OrderCell;
