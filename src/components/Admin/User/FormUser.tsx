import { useFormik } from "formik";
import * as Yup from "yup";
import {
  EMAIL_INVALID,
  FIELD_REQUIRED,
  SAVE_SUCCESS,
  UPDATE_SUCCESSFULLY,
} from "../../../constant/messages";
import { User } from "../../../types/user";
import Input from "../../Control/Input";
import SelectControl from "../../Control/SelectControl";
import Button from "../../Control/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser } from "../../../api/user";
import useBanner from "../../../hook/useBanner";

type Props = {
  item: User | null;
  toggleModal?: () => void;
};

const roleOptions = [
  { value: "Vendedor", label: "Vendedor" },
  { value: "Admin", label: "Admin" },
  { value: "User", label: "User" },
];

const FormUser = ({ item, toggleModal = () => {} }: Props) => {
  const banner = useBanner();
  const queryClient = useQueryClient();
  const { mutate: createMutation, isPending: isCreating } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      banner.simpleSuccess(SAVE_SUCCESS);
      queryClient.refetchQueries({ queryKey: ["getUserPaginated"] });
      toggleModal();
    },
    onError: (error) => {
      banner.simpleError(error);
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      banner.simpleSuccess(UPDATE_SUCCESSFULLY);
      queryClient.refetchQueries({ queryKey: ["getUserPaginated"] });
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
      email: item?.email ?? "",
      role: item?.role ?? "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(FIELD_REQUIRED),
      role: Yup.string().required(FIELD_REQUIRED),
      email: Yup.string().email(EMAIL_INVALID).required(FIELD_REQUIRED),
      password: Yup.string().when("id", ([id], schema) => {
        return !Boolean(id)
          ? schema.required(FIELD_REQUIRED)
          : schema.notRequired();
      }),
    }),
    onSubmit: async (values) => {
      if (values.id) {
        mutate({
          id: values.id,
          body: values,
        });
      } else {
        createMutation({
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
        });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-2 mt-2">
        <Input
          label={"Nombre"}
          id={"name"}
          name={"name"}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors?.name}
        />
        <Input
          label={"Email"}
          id={"email"}
          name={"email"}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors?.email}
        />
        {!formik.values.id && (
          <Input
            label={"Contraseña"}
            id={"password"}
            type="password"
            name={"password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors?.password}
          />
        )}
        <SelectControl
          id="hotel"
          name="role"
          label="Role"
          value={
            formik.values.role
              ? {
                  value: formik.values.role,
                  label: formik.values.role,
                }
              : null
          }
          onChange={(value) => {
            formik.setFieldValue("role", value?.value ?? "");
          }}
          options={roleOptions}
          error={formik.errors?.role}
        />

        <Button
          type="submit"
          variant="dark"
          fullWidth={false}
          importantClass="!w-28"
          disabled={isPending}
          loading={isPending}
        />
      </div>
    </form>
  );
};

export default FormUser;
