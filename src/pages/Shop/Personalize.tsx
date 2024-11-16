import SchemaDefault2 from "../../components/Layouts/SchemaDefault2";
import FormPersonalization from "../../components/Personalization/FormPersonalization";
import { useFormik } from "formik";
import Button from "../../components/Control/Button";
import { Order } from "../../types/order";
import CardImageCollage from "./Common/CardImageCollage";
import { useAppSelector } from "@/hook/useRedux";

const Personalize = () => {
  const { order } = useAppSelector((state) => state.order);
  const initialValues: Order = {
    id: "",
    technique: {
      title: "",
      price: 0,
    },
    product: {
      title: "",
      url: "",
    },
    label: "",
    typographic: {
      title: "",
    },
    labelColor: {
      code: "",
      title: "",
    },
    productStyle: {
      code: "",
      title: "",
    },
    productSize: {
      code: "",
      title: "",
    },
    productColor: {
      code: "",
      title: "",
    },
    art: {
      title: "",
      url: "",
    },
    patchAdd: {
      title: "",
      url: "",
    },
    motifAdd: {
      title: "",
      url: "",
    },
    textAdd: {
      title: "",
      url: "",
    },
  };
  console.log(order);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
            labelClass="max-w-[300px] break-words text-center mt-1 uppercase text-2xl font-semibold tracking-wide"
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
