import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Banner from "../Common/Banner";
import Button from "../Control/Button";
import { setUser } from "../../utils/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState("");

  //   const { mutate, isPending } = useMutation({
  //     mutationFn: login,
  //     onSuccess: (response) => {
  //       localStorage.setItem("doctorvideo-sld", JSON.stringify(response));
  //       navigate("/");
  //     },
  //     onError: (error) => {
  //       setErrorText(extractMeaningfulMessage(error, ERROR_SERVER));
  //       if (error.response.data.toString() === "105") {
  //         setRecoverPassword((prev) => ({
  //           ...prev,
  //           showButton: true,
  //         }));
  //       }
  //     },
  //   });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      //username: Yup.string().email(EMAIL_INVALID).required(FIELD_REQUIRED),
      //password: Yup.string().required(FIELD_REQUIRED),
    }),
    onSubmit: async (values) => {
      console.log(values);
      setUser(values);
      navigate("/");
      // mutate(values);
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
            htmlFor="username"
          >
            Email:
          </label>
          <input
            className="col-span-3 px-4 py-2 border border-gray-400 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
            id="username"
            type="email"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center">
          <label
            className="col-span-1 text-purple-700 font-bold mb-1"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="col-span-3 px-4 py-2 border border-gray-400 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
            id="password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex justify-end">
          <Button
            label="SIGN IN"
            type="submit"
            importantClass="!p-1 !w-1/3 rounded-2xl"
            //   loading={isPending}
            //   disabled={isPending}
          />
        </div>
      </div>

      {/* <div className="mb-4 w-full">
        <label
          className="block text-gray-700 text-[14px] font-[500]"
          htmlFor="password"
        >
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="w-full p-2 border border-[#E8E9EA] rounded-[5px] h-[42px]"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? (
              <RiEyeFill className="text-[#949CA9]" />
            ) : (
              <RiEyeCloseLine className="text-[#949CA9]" />
            )}
          </button>
        </div>

        {Boolean(formik.errors?.password) && (
          <span className="text-red-500 text-[12px]">
            {formik.errors?.password}
          </span>
        )}
      </div> */}
    </form>
  );
};

export default LoginForm;
