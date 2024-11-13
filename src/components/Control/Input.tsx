import { InputHTMLAttributes } from "react";

type InputProps = {
  id: string;
  name: string;
  type?: "text" | "number" | "password" | "file";
  label?: string;
  value: string | number;
  onChange: (event: InputHTMLAttributes<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  max?: number;
  min?: number;
  importantClass?: string;
  importantClassLabel?: string;
  importantClassContainer?: string;
  readOnly?: boolean;
};

const Input = ({
  type = "text",
  label = undefined,
  value,
  onChange,
  error,
  id,
  name,
  disabled = false,
  placeholder = "",
  max = undefined,
  min = undefined,
  importantClass = "",
  importantClassLabel = "",
  importantClassContainer = "",
  readOnly = false,
}: InputProps) => {
  return (
    <div className={`mb-2 w-full ${importantClassContainer}`}>
      {Boolean(label) && (
        <label
          className={`block text-gray-700 text-[14px] font-[500] ${importantClassLabel}`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <>
        <input
          id={id}
          name={name}
          type={type}
          className={`w-full p-2 border border-[#E8E9EA] rounded-[5px] h-[42px] ${importantClass}`}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          max={max}
          min={min}
          readOnly={readOnly}
        />
        {Boolean(error) && (
          <span className="text-red-500 text-[12px]">{error}</span>
        )}
      </>
    </div>
  );
};

export default Input;
