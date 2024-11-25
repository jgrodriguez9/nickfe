import CardImageCollage from "@/pages/Shop/Common/CardImageCollage";
import { OrderSchema, OrdersSchema } from "@/types/order";
import { formatNumber } from "@/utils/jsFormatNumber";
import { useMemo } from "react";

type Props = {
  order: OrderSchema | null;
};

const ViewOrder = ({ order }: Props) => {
  if (!order) return null;
  const price = useMemo(() => {
    const price = order.orders.reduce(
      (acc, curr) =>
        acc + (curr.technique.price + curr.product.price) * curr.qty,
      0
    );
    return price;
  }, [order]);

  return (
    <div
      className={`${
        order.orders.length > 1 ? "border-b-site-primary border-b-2" : ""
      }`}
    >
      {order.orders.map((product: OrdersSchema) => (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-3 border-b-gray-300 border-b pb-4">
          <div>
            <CardImageCollage
              productClass="w-[260px] h-[260px] relative"
              artClass="w-[100px] mt-16"
              labelClass="max-w-[300px] break-words text-center uppercase text-sm font-semibold tracking-wide"
              name={product.label}
              bgImage={product.product.imageUrl}
              bgDesign={product.design.imageUrl}
              sx={
                product.typographic.value
                  ? {
                      fontFamily: product.typographic.value,
                      color: product.typographic.color,
                    }
                  : {
                      fontFamily: "sans-serif",
                      color: "#000",
                    }
              }
            />
          </div>
          <div className="lg:grow">
            <ul className="flex flex-col gap-0">
              <li className="flex gap-1">
                <strong>Code:</strong>
                <strong className="text-site-primary">{order.code}</strong>
              </li>
              <li className="flex gap-1">
                <strong>Producto:</strong>
                <span>{product.product.name}</span>
              </li>
              <li className="flex gap-1">
                <strong>Color code:</strong>
                <span>{product.product.color.value}</span>
              </li>
              <li className="flex gap-1">
                <strong>Tamaño:</strong>
                <span>{product.productSize.value}</span>
              </li>
              <li className="flex gap-1">
                <strong>Técnica:</strong>
                <span>{product.technique.name}</span>
              </li>
              <li className="flex gap-1">
                <strong>Nombre:</strong>
                <span>{product.label}</span>
              </li>
              <li className="flex gap-1">
                <strong>Color de nombre:</strong>
                <span>{product.typographic.color}</span>
              </li>
              <li className="flex gap-1">
                <strong>Font:</strong>
                <span>{product.typographic.value}</span>
              </li>
              <li className="flex gap-1">
                <strong>Arte:</strong>
                <span>{product.character.name}</span>
              </li>
              <li className="flex gap-1">
                <strong>Diseño SKU:</strong>
                <span>{product.design.sku}</span>
              </li>
              {/* <li className="flex gap-1">
                  <strong>Parche:</strong>
                  <span>sponge_bob_35</span>
                </li>
                <li className="flex gap-1">
                  <strong>Motif:</strong>
                  <span>sponge_bob_38</span>
                </li>
                <li className="flex gap-1">
                  <strong>Texto:</strong>
                  <span>RD</span>
                </li> */}
            </ul>
          </div>
          <div className="pe-10">
            <span className="text-lg font-semibold text-gray-500">{`Qty: ${product.qty}`}</span>
          </div>
          <div>
            <span className="text-xl font-semibold text-black">
              {formatNumber(price)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewOrder;
