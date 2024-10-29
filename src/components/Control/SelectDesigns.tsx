/* eslint-disable @typescript-eslint/no-explicit-any */

//test data
import design from "../../../public/samples/design.webp";
import { formatNumber } from "../../utils/jsFormatNumber";
const designs = [{ value: "1", label: design, price: 5 }];

type SelectDesignsProps = {
  id: string;
  name: string;
  label?: string;
  value: string;
  designOptions?: any[];
  error?: string;
  importantClassLabel?: string;
  importantClassContainer?: string;
};

const SelectDesigns = ({
  id,
  name,
  label = undefined,
  value,
  designOptions = designs,
  importantClassLabel = "",
  importantClassContainer = "",
  error = undefined,
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
          {designOptions.map((color) => (
            <div
              key={color.value}
              className={`flex flex-col border border-gray-200`}
            >
              <img
                src={color.label}
                alt="design"
                className="h-24 w-24 object-contain"
              />
              {color.price && (
                <div className="bg-site-primary">
                  <h3 className="text-white text-normal font-semibold p-1 text-end">
                    +{formatNumber(color.price)}
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
