import { ChartConfig } from "@/components/ui/chart";
import KpiCard from "./KPI/KpiCard";
import { formatNumber } from "@/utils/jsFormatNumber";

//examples
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#000000",
  },
} satisfies ChartConfig;
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig1 = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
const chartData2 = [
  { browser: "chrome", visitors: 80, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 20, fill: "var(--color-other)" },
];

const StatsKpi = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-1">
        <KpiCard
          title="Total revenue"
          total={formatNumber(15231.89)}
          chartType={"lineal"}
          chartData={chartData}
          chartConfig={chartConfig}
          subTitle="+20.1% from last month"
        />
      </div>
      <div className="col-span-1">
        <KpiCard
          title="Goal complete"
          total={formatNumber(800)}
          chartType={"pie"}
          chartData={chartData2}
          chartConfig={chartConfig1}
          subTitle="Amount $2300.00"
        />
      </div>
    </div>
  );
};

export default StatsKpi;
