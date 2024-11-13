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
import { Character, DesignSchema } from "@/types/character";
import { createDesign, updateDesign } from "@/api/design";
import SelectControl from "@/components/Control/SelectControl";
import useGetCharacterQuery from "@/hook/Queries/useGetCharacterQuery";

type Props = {
  item: DesignSchema | null;
  toggleModal?: () => void;
};

const FormDesign = ({ item, toggleModal = () => {} }: Props) => {
  const [file, setFile] = useState<any>();
  const banner = useBanner();
  const queryClient = useQueryClient();
  const { data: characterOptions } = useGetCharacterQuery();

  const { mutate: createMutation, isPending: isCreating } = useMutation({
    mutationFn: createDesign,
    onSuccess: () => {
      banner.simpleSuccess(SAVE_SUCCESS);
      queryClient.refetchQueries({ queryKey: ["getDesigns"] });
      toggleModal();
    },
    onError: (error) => {
      banner.simpleError(error);
    },
  });
  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateDesign,
    onSuccess: () => {
      banner.simpleSuccess(UPDATE_SUCCESSFULLY);
      queryClient.refetchQueries({ queryKey: ["getDesigns"] });
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
      sku: item?.sku ?? "",
      name: item?.name ?? "",
      imageUrl: item?.imageUrl ?? "",
      imageId: item?.imageId ?? "",
      characterId: item?.characterId ?? "",
      characterName: item?.characterName ?? "",
    },
    validationSchema: Yup.object({
      sku: Yup.string().required(FIELD_REQUIRED),
      name: Yup.string().required(FIELD_REQUIRED),
      imageUrl: Yup.string().required(FIELD_REQUIRED),
      characterId: Yup.string().required(FIELD_REQUIRED),
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
      console.log(data);
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
            label={"SKU"}
            id={"sku"}
            name={"sku"}
            value={formik.values.sku}
            onChange={formik.handleChange}
            error={formik.errors?.sku}
          />
          <Input
            label={"Nombre"}
            id={"name"}
            name={"name"}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors?.name}
          />
        </div>
        <SelectControl
          id="characterId"
          name="characterId"
          label="Character"
          value={
            formik.values.characterId
              ? {
                  value: formik.values.characterId,
                  label: formik.values.characterName,
                }
              : null
          }
          onChange={(value) => {
            console.log(value);
            formik.setFieldValue("characterId", value?.value ?? "");
            formik.setFieldValue("characterName", value?.label ?? "");
          }}
          options={(characterOptions?.items ?? []).map(
            (it: Character & { _id: string }) => ({
              value: it._id,
              label: it.name,
            })
          )}
          error={formik.errors?.characterId}
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

export default FormDesign;
