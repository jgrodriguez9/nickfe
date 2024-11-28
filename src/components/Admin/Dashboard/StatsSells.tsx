import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { IoWarningOutline } from "react-icons/io5";

import CardSell from "./Common/CardSell";
import { PiXCircle } from "react-icons/pi";

const StatsSells = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 p-4 rounded-lg shadow-md gap-16">
      <CardSell
        title="total Orders"
        icon={
          <IoIosCheckmarkCircleOutline className="text-gray-500 text-[2rem]" />
        }
        total="300"
      />
      <CardSell
        title="Pending orders"
        icon={<IoWarningOutline className="text-orange-500 text-[2rem]" />}
        total="200"
      />{" "}
      <CardSell
        title="paid Orders"
        icon={<LiaCheckDoubleSolid className="text-green-500 text-[2rem]" />}
        total="200"
      />
      <CardSell
        title="cancelled Orders"
        icon={<PiXCircle className="text-red-500 text-[2rem]" />}
        total="100"
      />
    </div>
  );
};

export default StatsSells;
