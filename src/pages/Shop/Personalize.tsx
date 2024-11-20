import SchemaDefault2 from "../../components/Layouts/SchemaDefault2";
import FormPersonalization from "../../components/Personalization/FormPersonalization";
import { useFormik } from "formik";
import Button from "../../components/Control/Button";
import { Order } from "../../types/order";
import CardImageCollage from "./Common/CardImageCollage";
import { useAppSelector } from "@/hook/useRedux";
import * as Yup from "yup";
import { FIELD_REQUIRED } from "@/constant/messages";

const Personalize = () => {
  const { order } = useAppSelector((state) => state.order);
  const initialValues: Order & { qty: number } = {
    qty: 1,
    ...order,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      label: Yup.string().required(FIELD_REQUIRED),
      typographic: Yup.object().shape({
        value: Yup.string().required(FIELD_REQUIRED),
        color: Yup.string().required(FIELD_REQUIRED),
      }),
      productStyle: Yup.object().shape({
        value: Yup.string().required(FIELD_REQUIRED),
      }),
      productSize: Yup.object().shape({
        value: Yup.string().required(FIELD_REQUIRED),
      }),
      productColor: Yup.object().shape({
        value: Yup.string().required(FIELD_REQUIRED),
      }),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  console.log(formik.errors);
  return (
    <div className="relative  mt-52 w-full gap-8">
      <div className="flex flex-col md:flex-row justify-center w-full md:w-2/3 mx-auto lg:justify-between">
        <div>
          <CardImageCollage
            bgImage={order.product.imageUrl}
            bgDesign={order.design.imageUrl}
            productClass="w-[600px] h-[700px] relative"
            name={formik.values.label}
            artClass="w-[225px] mt-48"
            labelClass={`max-w-[300px] break-words text-center mt-1 uppercase text-2xl font-semibold 
              tracking-wide`}
            sx={
              formik.values.typographic.value
                ? {
                    fontFamily: formik.values.typographic.value,
                    color: formik.values.typographic.color,
                  }
                : {
                    fontFamily: "sans-serif",
                    color: "#000",
                  }
            }
          />
        </div>
        <div className="grow">
          <FormPersonalization formik={formik} />
        </div>
      </div>
      <div className="flex flex-row w-full md:w-2/3 mx-auto">
        <div>
          <Button
            label="Regresar"
            importantClass="!w-[200px] uppercase tracking-wider text-lg bg-gray-500 text-white"
            variant="light"
          />
        </div>
      </div>
      <div className="relative mt-60">
        <SchemaDefault2 />
      </div>
    </div>
  );
};

export default Personalize;
