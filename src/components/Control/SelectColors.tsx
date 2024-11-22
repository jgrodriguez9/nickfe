/* eslint-disable @typescript-eslint/no-explicit-any */

//test data
const colors = [
  { value: "#F59E0B", label: "Amarillo" },
  { value: "#EF4444", label: "Rojo" },
  { value: "#6B7280", label: "Negro" },
  { value: "#FFFFFF", label: "Blanco" },
];

type ColorOption = {
  value: string;
  label: string;
};

type SelectColorsProps = {
  id: string;
  label?: string;
  value: string;
  colorOptions: ColorOption[];
  error?: string;
  importantClassLabel?: string;
  importantClassContainer?: string;
  onClick: (value: any) => void;
};

const SelectColors = ({
  id,
  label = undefined,
  value,
  colorOptions = colors,
  importantClassLabel = "",
  importantClassContainer = "",
  error = undefined,
  onClick,
}: SelectColorsProps) => {
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
        <div className="flex flex-row gap-2 flex-wrap">
          {colorOptions.map((color) => (
            <div
              key={color.value}
              style={{ backgroundColor: color.value }}
              className={`h-10 w-10 rounded-full border  ${
                value === color.value
                  ? "border-site-primary border-4"
                  : "border-gray-200"
              }`}
              onClick={() => onClick(color)}
            />
          ))}
        </div>
        {Boolean(error) && (
          <span className="text-red-500 text-[12px]">{error}</span>
        )}
      </>
    </div>
  );
};

export default SelectColors;
