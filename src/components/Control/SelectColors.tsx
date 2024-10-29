/* eslint-disable @typescript-eslint/no-explicit-any */

//test data
const colors = [
  { value: "#F59E0B", label: "Amarillo" },
  { value: "#EF4444", label: "Rojo" },
  { value: "#6B7280", label: "Negro" },
  { value: "#FFFFFF", label: "Blanco" },
];

type SelectColorsProps = {
  id: string;
  name: string;
  label?: string;
  value: string;
  colorOptions?: any[];
  error?: string;
  importantClassLabel?: string;
  importantClassContainer?: string;
};

const SelectColors = ({
  id,
  name,
  label = undefined,
  value,
  colorOptions = colors,
  importantClassLabel = "",
  importantClassContainer = "",
  error = undefined,
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
              className={`h-10 w-10 rounded-full border border-gray-200`}
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
