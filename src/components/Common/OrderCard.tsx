import { AddQty, OrderCart } from "@/types/order";
import CardImageCollage from "../../pages/Shop/Common/CardImageCollage";
import { formatNumber } from "../../utils/jsFormatNumber";
import ButtonOrder from "../Personalization/ButtonOrder";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { addQty } from "@/redux/cartSlice";

type Props = {
  product: OrderCart;
};
const OrderCard = ({ product }: Props) => {
  const dispatch = useDispatch();
  const price = useMemo(() => {
    return (product.technique.price + product.product.price) * product.qty;
  }, [product]);

  const handleChangeQty = (qty: number) => {
    const payload: AddQty = {
      code: product.code,
      qty: qty,
    };
    dispatch(addQty(payload));
  };

  return (
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
          <li>
            <strong>{product.product.name}</strong>
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
      <div className="pe-5">
        <ButtonOrder handleChangeQty={handleChangeQty} qty={product.qty} />
      </div>
      <div>
        <span className="text-xl font-semibold text-black">
          {formatNumber(price)}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
