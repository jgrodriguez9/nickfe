import { ErrorMessage, Field } from "formik";

type InputFormikProps = {
  name: string;
  label?: string;
};

const InputFormik = ({ name, label }: InputFormikProps) => {
  return (
    <div className="mb-2 w-full">
      {Boolean(label) && (
        <label
          className={`block text-gray-700 text-[14px] font-[500]`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <Field
        className={`w-full p-2 border border-[#E8E9EA] rounded-[5px] h-[42px]`}
        name={name}
      />
      <ErrorMessage
        name={name}
        component="span"
        className="text-red-500 text-[12px]"
      />
    </div>
  );
};

export default InputFormik;
