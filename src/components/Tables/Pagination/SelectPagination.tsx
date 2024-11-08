type SelectType = {
  key: string;
  desc: string | number;
};

type SelectPagination = {
  id: string;
  title: string;
  value: string | number;
  onChange: (value: string) => void;
  options: SelectType[];
};

const SelectPagination = ({
  title,
  onChange,
  options,
  id,
  value,
}: SelectPagination) => {
  return (
    <label htmlFor={`select-${id}`}>
      {title}
      <select
        className="border p-1 rounded w-12 ml-1"
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          onChange(value);
        }}
      >
        {options.map(({ key, desc }) => (
          <option key={key}>{desc}</option>
        ))}
      </select>
    </label>
  );
};

export default SelectPagination;
