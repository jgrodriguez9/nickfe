/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { setProductColor } from "../../redux/orderSlice";
import Card from "../Common/Card";
import Button from "../Control/Button";
import Input from "../Control/Input";
import SelectColors from "../Control/SelectColors";
import SelectSingle from "../Control/SelectSingle";
import ButtonOrder from "./ButtonOrder";
import TabPersonalize from "./TabPersonalize";
import { Colors, ProductTalla } from "@/types/product";
import {
  typographiesColors,
  typographiesOpt,
} from "@/constant/typographiesOpt";
import { TypographyOptions, TypographyOptionsValue } from "@/types/character";
import { ProductImage } from "@/types/order";

const productStyles = [
  { value: "Women", label: "Women" },
  { value: "Man", label: "Man" },
  { value: "Kids", label: "Kids" },
];

type FormPersonalizationProps = {
  formik: any;
};

const FormPersonalization = ({ formik }: FormPersonalizationProps) => {
  const { product } = useAppSelector((state) => state.order.order);
  const dispatch = useAppDispatch();

  const { tallasOpt, colorProductOpt } = useMemo(() => {
    if (!product) {
      return {
        tallasOpt: [],
        colorProductOpt: [],
      };
    } else {
      return {
        tallasOpt: product.tallas.map((it: ProductTalla) => ({
          value: it.code,
          label: it.code,
        })),
        colorProductOpt: product.tallas.flatMap((it: ProductTalla) =>
          it.colors.map((cl: Colors) => ({
            value: cl.codeHex,
            label: cl.name,
            imageUrl: cl.imageUrl,
          }))
        ),
      };
    }
  }, [product]);

  // const onHandleChangeSelect = (value: any, key: string) => {
  //   formik.setFieldValue(key, value);
  //   dispatch(
  //     setValueOrder({
  //       key: key,
  //       value: value,
  //     })
  //   );
  // };

  const onHandleChangeSelectProductColor = (value: ProductImage) => {
    console.log(value.value);
    formik.setFieldValue(`productColor.value`, value.value);
    formik.setFieldValue(`product.imageUrl`, value.imgUrl);
    dispatch(
      setProductColor({
        imgUrl: value.imgUrl,
        value: value.value,
      })
    );
  };

  const handleChangeQty = (qty: number) => {
    formik.setFieldValue("qty", qty);
  };

  const typographyOpt = useMemo(() => {
    if (!formik.values.character.id) return [];
    return (
      typographiesOpt
        .find(
          (it: TypographyOptions) =>
            it.characterId === formik.values.character.id
        )
        ?.values?.map((it: TypographyOptionsValue) => ({
          value: it.code,
          label: it.name,
        })) ?? []
    );
  }, [formik.values.character.id]);

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
          error={formik.errors?.label}
        />
        <SelectSingle
          id="typographic.value"
          name="typographic.value"
          label="Tipografía"
          value={formik.values.typographic.value}
          onChange={formik.handleChange}
          options={typographyOpt}
          error={formik.errors?.typographic?.value}
        />
        <SelectColors
          id="color"
          label="COLOR DE TIPOGRAFÍA"
          value={formik.values.typographic.color}
          onClick={(value: any) => {
            formik.setFieldValue("typographic.color", value.value);
          }}
          colorOptions={typographiesColors}
          error={formik.errors?.typographic?.color}
        />
        <SelectSingle
          id="productStyle.value"
          name="productStyle.value"
          label="Estilo de producto"
          value={formik.values.productStyle.value}
          onChange={formik.handleChange}
          options={productStyles}
          error={formik.errors?.productStyle?.value}
        />
        <SelectSingle
          id="productSize.value"
          name="productSize.value"
          label="Talla"
          value={formik.values.productSize.value}
          onChange={formik.handleChange}
          options={tallasOpt}
          error={formik.errors?.productSize?.value}
        />
        <SelectColors
          id="colorProduct"
          label="Color del producto"
          value={formik.values.productColor.value}
          onClick={(value: any) => {
            const parseCl: ProductImage = {
              imgUrl: value?.imageUrl ?? "",
              value: value?.value ?? "",
            };
            onHandleChangeSelectProductColor(parseCl);
          }}
          colorOptions={colorProductOpt}
          error={formik.errors?.productColor?.value}
        />
        <TabPersonalize formik={formik} />

        <ButtonOrder
          handleChangeQty={handleChangeQty}
          qty={formik.values.qty}
        />

        <Button
          label="Agregar al carrito"
          type="button"
          importantClass="mt-2"
          fullWidth
          onClick={() => formik.handleSubmit()}
        />
      </div>
    </Card>
  );
};

export default FormPersonalization;
