import Input from "@/components/Control/Input";
import UploadPreviewImage from "@/components/Control/UploadPreviewImage";
import { Button } from "@/components/ui/button";
import {
  FIELD_REQUIRED,
  SAVE_SUCCESS,
  UPDATE_SUCCESSFULLY,
} from "@/constant/messages";
import useBanner from "@/hook/useBanner";
import { convertBase64 } from "@/utils/convertBase64";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Technique } from "@/types/technique";
import { createTechnique, updateTechnique } from "@/api/technique";

type Props = {
  item: Technique | null;
  toggleModal?: () => void;
};

const FormTechnique = ({ item, toggleModal = () => {} }: Props) => {
  const [file, setFile] = useState<any>();
  const banner = useBanner();
  const queryClient = useQueryClient();
  const { mutate: createMutation, isPending: isCreating } = useMutation({
    mutationFn: createTechnique,
    onSuccess: () => {
      banner.simpleSuccess(SAVE_SUCCESS);
      queryClient.refetchQueries({ queryKey: ["getTechniques"] });
      toggleModal();
    },
    onError: (error) => {
      banner.simpleError(error);
    },
  });
  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateTechnique,
    onSuccess: () => {
      banner.simpleSuccess(UPDATE_SUCCESSFULLY);
      queryClient.refetchQueries({ queryKey: ["getTechniques"] });
      toggleModal();
    },
    onError: (error) => {
      banner.simpleError(error);
    },
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: item?.id ?? "",
      name: item?.name ?? "",
      nameEng: item?.nameEng ?? "",
      imageUrl: item?.imageUrl ?? "",
      imageId: item?.imageId ?? "",
      price: item?.price ?? 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(FIELD_REQUIRED),
      nameEng: Yup.string().required(FIELD_REQUIRED),
      imageUrl: Yup.string().required(FIELD_REQUIRED),
      price: Yup.string().required(FIELD_REQUIRED),
    }),
    onSubmit: async (values) => {
      let imageBase64 = undefined;
      if (file) {
        imageBase64 = await convertBase64(file);
      } else {
        imageBase64 = values.imageUrl;
      }

      const data = {
        ...values,
        imageUrl: imageBase64,
      };
      if (values.id) {
        updateMutation({
          id: values.id,
          body: data,
        });
      } else {
        createMutation(data);
      }
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
        <UploadPreviewImage urlImg={item?.imageUrl} setFile={setFile} />
        {Boolean(formik.errors?.imageUrl) && (
          <span className="text-red-500 text-[12px] text-center">
            {formik.errors?.imageUrl}
          </span>
        )}
        <div className="flex flex-col lg:flex-row gap-2">
          <Input
            label={"Name"}
            id={"name"}
            name={"name"}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors?.name}
          />
          <Input
            label={"English name"}
            id={"nameEng"}
            name={"nameEng"}
            value={formik.values.nameEng}
            onChange={formik.handleChange}
            error={formik.errors?.nameEng}
          />
        </div>
        <Input
          label={"Price"}
          id={"price"}
          name={"price"}
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.errors?.price}
        />

        <Button
          variant="default"
          type="submit"
          className="!w-fit"
          isLoading={isCreating || isUpdating}
          disabled={isCreating || isUpdating}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormTechnique;
