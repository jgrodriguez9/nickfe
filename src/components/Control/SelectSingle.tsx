import { InputHTMLAttributes } from "react";

type OptionProps = {
  value: string;
  label: string;
};

type SelectSingleProps = {
  id: string;
  name: string;
  label?: string;
  value: string | number;
  onChange: (event: InputHTMLAttributes<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  importantClass?: string;
  importantClassLabel?: string;
  importantClassContainer?: string;
  options: OptionProps[];
};

const SelectSingle = ({
  label = undefined,
  value,
  onChange,
  error,
  id,
  name,
  disabled = false,
  importantClass = "",
  importantClassLabel = "",
  importantClassContainer = "",
  options = [],
}: SelectSingleProps) => {
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
        <select
          id={id}
          name={name}
          className={`w-full p-2 border border-[#E8E9EA] rounded-[5px] h-[42px] ${importantClass}`}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          <option value={""}>Seleccionar opción</option>
          {options.map((it) => (
            <option key={it.value} value={it.value}>
              {it.label}
            </option>
          ))}
        </select>

        {Boolean(error) && (
          <span className="text-red-500 text-[12px]">{error}</span>
        )}
      </>
    </div>
  );
};

export default SelectSingle;
