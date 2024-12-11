import { createProduct, updateProduct } from "@/api/product";
import Input from "@/components/Control/Input";
import InputFormik from "@/components/Control/InputFormik";
import InputImage from "@/components/Control/InputImage";
import SelectMulti from "@/components/Control/SelectMulti";
import UploadPreviewImage from "@/components/Control/UploadPreviewImage";
import { Button } from "@/components/ui/button";
import {
  FIELD_REQUIRED,
  SAVE_SUCCESS,
  UPDATE_SUCCESSFULLY,
} from "@/constant/messages";
import useGetTechniqueQuery from "@/hook/Queries/useGetTechniqueQuery";
import useBanner from "@/hook/useBanner";
import { Product } from "@/types/product";
import { Technique } from "@/types/technique";
import { convertBase64 } from "@/utils/convertBase64";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import * as Yup from "yup";

type Props = {
  item: Product | null;
  toggleModal?: () => void;
};

const FormProduct = ({ item, toggleModal = () => {} }: Props) => {
  const [file, setFile] = useState<any>();
  const banner = useBanner();
  const queryClient = useQueryClient();
  const { data: techniquesOptions } = useGetTechniqueQuery();
  const { mutate: createMutation, isPending: isCreating } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      banner.simpleSuccess(SAVE_SUCCESS);
      queryClient.refetchQueries({ queryKey: ["getProducts"] });
      toggleModal();
    },
    onError: (error) => {
      banner.simpleError(error);
    },
  });
  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      banner.simpleSuccess(UPDATE_SUCCESSFULLY);
      queryClient.refetchQueries({ queryKey: ["getProducts"] });
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
      tallas: item?.tallas ?? [],
      price: item?.price ?? 0,
      techniques: item?.techniques ?? [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required(FIELD_REQUIRED),
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
            label={"Nombre"}
            id={"name"}
            name={"name"}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors?.name}
          />
          <Input
            label={"Price"}
            id={"price"}
            name={"price"}
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.errors?.price}
          />
        </div>
        <SelectMulti
          id="techniques"
          name="techniques"
          label="Techniques"
          value={formik.values.techniques.map((it) => ({
            value: it.id,
            label: it.name,
          }))}
          onChange={(value) => {
            console.log(value);
            if (value) {
              const newValues = value?.map((it) => ({
                id: it.value,
                name: it.label,
              }));
              formik.setFieldValue("techniques", newValues);
            } else {
              formik.setFieldValue("techniques", []);
            }
          }}
          options={(techniquesOptions?.items ?? []).map(
            (it: Technique & { _id: string }) => ({
              value: it._id,
              label: it.name,
            })
          )}
          error={formik.errors?.techniques?.length ? "Required field" : ""}
        />

        <FormikProvider value={formik}>
          <FieldArray name="tallas">
            {({ remove, push }) => (
              <div>
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() =>
                    push({
                      code: "",
                      name: "",
                      quantity: 0,
                      colors: [],
                    })
                  }
                >
                  Add sizes
                </Button>
                {formik.values.tallas.length > 0 &&
                  formik.values.tallas.map((_talla, idx) => (
                    <div className="flex flex-col border p-2 my-1">
                      <div
                        className="flex flex-col lg:flex-row gap-2 items-center"
                        key={`tallas-${idx}`}
                      >
                        <InputFormik label="Code" name={`tallas.${idx}.code`} />
                        <InputFormik label="Name" name={`tallas.${idx}.name`} />
                        <InputFormik
                          label="Quantity"
                          name={`tallas.${idx}.quantity`}
                        />
                        <Button
                          type="button"
                          variant={"ghost"}
                          onClick={() => remove(idx)}
                          className="text-red-500"
                        >
                          <FaTrash />
                        </Button>
                      </div>
                      <div>
                        <FieldArray name={`tallas.${idx}.colors`}>
                          {({ remove: removeColors, push: pushColor }) => (
                            <div className="flex flex-col gap-2">
                              <Button
                                type="button"
                                variant={"outline"}
                                onClick={() =>
                                  pushColor({ codeHex: "", name: "" })
                                }
                                className="justify-start w-fit"
                              >
                                Add colors
                              </Button>
                              {_talla.colors.map((_color, idxColor: number) => (
                                <div
                                  className="flex flex-col lg:flex-row gap-2 items-center"
                                  key={`color-${idx}`}
                                >
                                  <InputImage />
                                  <InputFormik
                                    label="Code HEX"
                                    name={`tallas.${idx}.colors.${idxColor}.codeHex`}
                                  />
                                  <InputFormik
                                    label="Name"
                                    name={`tallas.${idx}.colors.${idxColor}.name`}
                                  />

                                  <Button
                                    type="button"
                                    variant={"ghost"}
                                    onClick={() => removeColors(idxColor)}
                                    className="text-red-500"
                                  >
                                    <FaTrash />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </FieldArray>
        </FormikProvider>

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

export default FormProduct;
