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
import { Character, TypographySchema } from "@/types/character";
import { createTypography, updateTypography } from "@/api/typography";
import useGetCharacterQuery from "@/hook/Queries/useGetCharacterQuery";
import SelectControl from "@/components/Control/SelectControl";

type Props = {
  item: TypographySchema | null;
  toggleModal?: () => void;
};

const FormTypography = ({ item, toggleModal = () => {} }: Props) => {
  const [file, setFile] = useState<any>();
  const banner = useBanner();
  const queryClient = useQueryClient();
  const { data: characterOptions } = useGetCharacterQuery();
  const { mutate: createMutation, isPending: isCreating } = useMutation({
    mutationFn: createTypography,
    onSuccess: () => {
      banner.simpleSuccess(SAVE_SUCCESS);
      queryClient.refetchQueries({ queryKey: ["getTypographies"] });
      toggleModal();
    },
    onError: (error) => {
      banner.simpleError(error);
    },
  });
  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateTypography,
    onSuccess: () => {
      banner.simpleSuccess(UPDATE_SUCCESSFULLY);
      queryClient.refetchQueries({ queryKey: ["getTypographies"] });
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
      imageUrl: item?.imageUrl ?? "",
      imageId: item?.imageId ?? "",
      characterId: item?.characterId ?? "",
      characterName: item?.characterName ?? "",
    },
    validationSchema: Yup.object({
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
        <Input
          label={"Nombre"}
          id={"name"}
          name={"name"}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors?.name}
        />
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

export default FormTypography;
