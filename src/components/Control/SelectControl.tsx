import { SELECT_OPTION } from "../../constant/messages";
import Select from "react-select";

export type ValueProps = {
  value: string;
  label: string;
};

type SelectSingleProps = {
  id: string;
  name: string;
  label?: string;
  value: ValueProps | null;
  onChange: (event: ValueProps | null) => void;
  error?: string;
  disabled?: boolean;
  importantClassLabel?: string;
  importantClassContainer?: string;
  options: ValueProps[] | [];
  clearable?: boolean;
  placeholder?: string;
};

const SelectControl = ({
  label = undefined,
  value,
  onChange,
  error,
  id,
  name,
  disabled = false,
  importantClassLabel = "",
  importantClassContainer = "",
  options = [],
  clearable = false,
  placeholder = SELECT_OPTION,
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
        <Select
          id={id}
          name={name}
          classNames={{
            control: (state) =>
              state.isFocused
                ? "!h-[42px] !border !border-[#E8E9EA] !rounded-[5px] !ring-1 !ring-black"
                : "!h-[42px] !border !border-[#E8E9EA] !rounded-[5px]",
          }}
          value={value}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          isDisabled={disabled}
          isClearable={clearable}
        />
        {Boolean(error) && (
          <span className="text-red-500 text-[12px]">{error}</span>
        )}
      </>
    </div>
  );
};

export default SelectControl;
