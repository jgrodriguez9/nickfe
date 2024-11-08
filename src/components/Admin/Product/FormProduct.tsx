import Input from "@/components/Control/Input";
import UploadPreviewImage from "@/components/Control/UploadPreviewImage";
import { Button } from "@/components/ui/button";
import { FIELD_REQUIRED } from "@/constant/messages";
import { Product } from "@/types/product";
import { convertBase64 } from "@/utils/convertBase64";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

type Props = {
  item: Product | null;
  toggleModal?: () => void;
};

const FormProduct = ({ item, toggleModal = () => {} }: Props) => {
  const [file, setFile] = useState<any>();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: item?.id ?? "",
      name: item?.name ?? "",
      imageUrl: item?.imageUrl ?? "",
      imageId: item?.imageId ?? "",
      tallas: item?.tallas ?? [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required(FIELD_REQUIRED),
      imageUrl: Yup.string().required(FIELD_REQUIRED),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const imageBase64 = await convertBase64(file);
      console.log(imageBase64);
    },
  });

  useEffect(() => {
    if (file) {
      formik.setFieldValue("imageUrl", file.name);
    }
  }, [file]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-2 mt-2">
        <UploadPreviewImage setFile={setFile} />
        {Boolean(formik.errors?.imageUrl) && (
          <span className="text-red-500 text-[12px] text-center">
            {formik.errors?.imageUrl}
          </span>
        )}
        <Input
          label={"Nombre"}
          id={"name"}
          name={"name"}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors?.name}
        />

        <Button variant="default" type="submit" className="!w-fit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormProduct;
