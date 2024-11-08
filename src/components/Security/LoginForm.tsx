import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Banner from "../Common/Banner";
import Button from "../Control/Button";
import { setUser } from "../../utils/auth";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/security";
import {
  EMAIL_INVALID,
  ERROR_SERVER,
  FIELD_REQUIRED,
} from "../../constant/messages";
import extractMeaningfulMessage from "../../utils/extractMeaningfulMessage";

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log(response);
      setUser(response);
      const role = response.role;
      if (role === "User") {
        navigate("/");
      } else {
        navigate("/admin");
      }
    },
    onError: (error) => {
      console.log(error);
      setErrorText(extractMeaningfulMessage(error, ERROR_SERVER));
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(EMAIL_INVALID).required(FIELD_REQUIRED),
      password: Yup.string().required(FIELD_REQUIRED),
    }),
    onSubmit: async (values) => {
      console.log(values);
      setErrorText("");
      //
      // navigate("/");
      mutate(values);
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
        return false;
      }}
    >
      {Boolean(errorText) && <Banner variant={"error"} text={errorText} />}

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-4 items-center">
          <label
            className="col-span-1 text-purple-700 font-bold mb-1"
            htmlFor="email"
          >
            Email:
          </label>
          <div className="col-span-3 flex flex-col gap-1">
            <input
              className="px-4 py-2 border border-gray-400 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
              id="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {Boolean(formik.errors?.email) && (
              <span className="text-red-500 text-[12px]">
                {formik.errors?.email}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center">
          <label
            className="col-span-1 text-purple-700 font-bold mb-1"
            htmlFor="password"
          >
            Password:
          </label>
          <div className="col-span-3 flex flex-col gap-1">
            <input
              className="px-4 py-2 border border-gray-400 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
              id="password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {Boolean(formik.errors?.password) && (
              <span className="text-red-500 text-[12px]">
                {formik.errors?.password}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            label="SIGN IN"
            type="submit"
            importantClass="!p-1 !w-1/3 rounded-2xl"
            loading={isPending}
            disabled={isPending}
          />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
