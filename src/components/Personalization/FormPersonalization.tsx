/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch } from "../../hook/useRedux";
import { addToCart } from "../../redux/cartSlice";
import { initialOrder } from "../../redux/orderSlice";
import { Order } from "../../types/order";
import Card from "../Common/Card";
import Button from "../Control/Button";
import Input from "../Control/Input";
import SelectColors from "../Control/SelectColors";
import SelectSingle from "../Control/SelectSingle";
import ButtonOrder from "./ButtonOrder";
import TabPersonalize from "./TabPersonalize";
import { nanoid } from "nanoid";

type FormPersonalizationProps = {
  formik: any;
};

const FormPersonalization = ({ formik }: FormPersonalizationProps) => {
  const dispatch = useAppDispatch();

  const handleAddItemToCart = () => {
    const codeOrder = nanoid(10);
    const newOrder: Order = {
      ...initialOrder,
      id: codeOrder,
    };
    dispatch(addToCart(newOrder));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Card extraClasses="border border-2 border-gray-300 rounded-lg">
      <div className="flex flex-col gap-2">
        <Input
          id="label"
          label="Nombre"
          name={"label"}
          value={formik.values.label}
          onChange={formik.handleChange}
          importantClass="uppercase"
        />
        <Input
          id="name"
          label="Tipografía"
          name={""}
          value={""}
          onChange={() => {}}
        />
        <SelectColors
          id="color"
          name="color"
          label="COLOR DE TIPOGRAFÍA"
          value={""}
        />
        <SelectSingle
          id="style"
          name="style"
          label="Estilo de producto"
          value={""}
          onChange={() => {}}
        />
        <SelectSingle
          id="talla"
          name="talla"
          label="Talla"
          value={""}
          onChange={() => {}}
        />
        <SelectColors
          id="colorProduct"
          name="colorProduct"
          label="Color del producto"
          value={""}
        />
        <TabPersonalize formik={formik} />

        <ButtonOrder />

        <Button
          label="Agregar al carrito"
          type="button"
          importantClass="mt-2"
          fullWidth
          onClick={handleAddItemToCart}
        />
      </div>
    </Card>
  );
};

export default FormPersonalization;
