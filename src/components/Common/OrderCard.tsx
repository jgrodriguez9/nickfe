import CardImageCollage from "../../pages/Shop/Common/CardImageCollage";
import { formatNumber } from "../../utils/jsFormatNumber";
import ButtonOrder from "../Personalization/ButtonOrder";

const OrderCard = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-3 border-b-gray-300 border-b pb-4">
      <div>
        <CardImageCollage
          productClass="w-[260px] h-[260px] relative"
          artClass="w-[100px] mt-16"
          labelClass="max-w-[300px] break-words text-center uppercase text-sm font-semibold tracking-wide"
          name={"test"}
        />
      </div>
      <div className="lg:grow">
        <ul className="flex flex-col gap-0">
          <li>
            <strong>Sudadera</strong>
          </li>
          <li className="flex gap-1">
            <strong>Color:</strong>
            <span>Blanco</span>
          </li>
          <li className="flex gap-1">
            <strong>Tamaño:</strong>
            <span>SMALL</span>
          </li>
          <li className="flex gap-1">
            <strong>Técnica:</strong>
            <span>Bordado</span>
          </li>
          <li className="flex gap-1">
            <strong>Nombre:</strong>
            <span>Javier</span>
          </li>
          <li className="flex gap-1">
            <strong>Color de nombre:</strong>
            <span>#000000</span>
          </li>
          <li className="flex gap-1">
            <strong>Font:</strong>
            <span>Avatar</span>
          </li>
          <li className="flex gap-1">
            <strong>Arte:</strong>
            <span>sponge_bob</span>
          </li>
          <li className="flex gap-1">
            <strong>Diseño:</strong>
            <span>sponge_bob_3</span>
          </li>
          <li className="flex gap-1">
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
          </li>
        </ul>
      </div>
      <div className="pe-5">
        <ButtonOrder />
      </div>
      <div>
        <span className="text-xl font-semibold text-black">
          {formatNumber(35)}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
