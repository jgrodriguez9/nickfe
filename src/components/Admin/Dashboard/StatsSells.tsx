import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { IoWarningOutline } from "react-icons/io5";
import { AiOutlineDollar } from "react-icons/ai";

import CardSell from "./Common/CardSell";
import { PiXCircle } from "react-icons/pi";
import { formatNumber } from "@/utils/jsFormatNumber";
import { formatNumberSimple } from "@/utils/formatNumberSimple";

type Totals = {
  cancelled: number;
  earning: number;
  payed: number;
  pending: number;
  totals: number;
};

type Props = {
  isLoading: boolean;
  totals: Totals;
};

const StatsSells = ({ isLoading, totals }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 p-4 rounded-lg shadow-md gap-16">
      <CardSell
        title="total Orders"
        icon={
          <IoIosCheckmarkCircleOutline className="text-gray-500 text-[2rem]" />
        }
        total={formatNumberSimple(totals.totals)}
        isLoading={isLoading}
      />
      <CardSell
        title="Pending orders"
        icon={<IoWarningOutline className="text-orange-500 text-[2rem]" />}
        total={formatNumberSimple(totals.pending)}
        isLoading={isLoading}
      />
      <CardSell
        title="paid Orders"
        icon={<LiaCheckDoubleSolid className="text-green-500 text-[2rem]" />}
        total={formatNumberSimple(totals.payed)}
        isLoading={isLoading}
      />
      <CardSell
        title="cancelled Orders"
        icon={<PiXCircle className="text-red-500 text-[2rem]" />}
        total={formatNumberSimple(totals.cancelled)}
        isLoading={isLoading}
      />
      <div className="ml-auto">
        <CardSell
          title="Total Earnings"
          icon={<AiOutlineDollar className="text-green-500 text-[2rem]" />}
          total={formatNumber(totals.earning)}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default StatsSells;
