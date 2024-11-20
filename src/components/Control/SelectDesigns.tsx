/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatNumber } from "../../utils/jsFormatNumber";

type DesignOptions = {
  id: string;
  price: number | undefined;
  sku?: string;
  imageUrl: string;
};

type SelectDesignsProps = {
  id: string;
  label?: string;
  value: string;
  designOptions?: DesignOptions[];
  error?: string;
  importantClassLabel?: string;
  importantClassContainer?: string;
  onClick: (value: any) => void;
};

const SelectDesigns = ({
  id,
  label = undefined,
  value,
  designOptions = [],
  importantClassLabel = "",
  importantClassContainer = "",
  error = undefined,
  onClick,
}: SelectDesignsProps) => {
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
          {designOptions.map((it: DesignOptions) => (
            <div
              key={it.id}
              className={`flex flex-col border ${
                value === it.id
                  ? "border-site-primary border-4"
                  : "border-gray-200"
              }`}
              onClick={() => onClick(it)}
            >
              <img
                src={it.imageUrl}
                alt={it.sku}
                className="h-24 w-24 object-contain"
              />
              {it.price && (
                <div className="bg-site-primary">
                  <h3 className="text-white text-normal font-semibold p-1 text-end">
                    +{formatNumber(it.price)}
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>
        {Boolean(error) && (
          <span className="text-red-500 text-[12px]">{error}</span>
        )}
      </>
    </div>
  );
};

export default SelectDesigns;
