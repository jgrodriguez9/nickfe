import { InputHTMLAttributes } from "react";

const options = [
  { value: "Woman", label: "Mujer" },
  { value: "Man", label: "Hombre" },
  { value: "Child", label: "Niño" },
];

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
          <option>Seleccionar opción</option>
          {options.map((it) => (
            <option key={it.value}>{it.label}</option>
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
