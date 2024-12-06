import KpiCard from "@/components/Admin/Dashboard/KPI/KpiCard";
import StatsSells from "@/components/Admin/Dashboard/StatsSells";
import { ChartConfig } from "@/components/ui/chart";
import useGetTotalEarningsQuery from "@/hook/Queries/useGetTotalEarningsQuery";
import useGetTotalGoalQuery from "@/hook/Queries/useGetTotalGoalQuery";
import useGetTotalsQuery from "@/hook/Queries/useGetTotalsQuery";
import { formatNumber } from "@/utils/jsFormatNumber";
import parseObjectToQueryUrl from "@/utils/parseObjectToQueryUrl";
import { useMemo, useState } from "react";

const text = "from last month";

const chartConfigTotalEarning = {
  desktop: {
    label: "Amount",
    color: "#000000",
  },
} satisfies ChartConfig;

const chartConfigGoalComplete = {
  amount: {
    label: "Goal",
  },
  total: {
    label: "Total",
    color: "#dedede",
  },
  current: {
    label: "Current",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const Dashboard = () => {
  const [query, setQuery] = useState({
    startDate: "",
    endDate: "",
  });
  const { data, isLoading } = useGetTotalsQuery({
    queryPath: `?${parseObjectToQueryUrl(query)}`,
  });

  const {
    data: totalsEarning,
    isLoading: isLoadingEarnings,
    isError: isErrorE,
  } = useGetTotalEarningsQuery({
    queryPath: `?${parseObjectToQueryUrl(query)}`,
  });

  const {
    data: totalsGoal,
    isLoading: isLoadingGoal,
    isError: isErrorG,
  } = useGetTotalGoalQuery({
    queryPath: `?${parseObjectToQueryUrl(query)}`,
  });

  console.log(totalsGoal);

  const { subTitleEarning } = useMemo(() => {
    if (!totalsEarning) {
      return {
        subTitleEarning: "",
      };
    } else {
      return {
        subTitleEarning:
          totalsEarning.percentage > 0
            ? `+${totalsEarning.percentage}% ${text}`
            : `${totalsEarning.percentage}% ${text}`,
      };
    }
  }, [totalsEarning]);
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="mb-8">
          <StatsSells isLoading={isLoading} totals={data} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1">
            {!isLoadingEarnings && !isErrorE && (
              <KpiCard
                title="Total earning"
                total={formatNumber(totalsEarning?.totalEarning ?? 0)}
                chartType={"lineal"}
                chartData={totalsEarning?.dayHistory ?? []}
                chartConfig={chartConfigTotalEarning}
                subTitle={subTitleEarning}
              />
            )}
          </div>
          <div className="col-span-1">
            {!isLoadingGoal && !isErrorG && (
              <KpiCard
                title="Goal complete"
                total={formatNumber(totalsGoal?.currentAmount ?? 0)}
                chartType={"pie"}
                chartData={totalsGoal?.chart ?? []}
                chartConfig={chartConfigGoalComplete}
                subTitle={`Goal: ${formatNumber(totalsGoal?.goal ?? 0)}`}
                percentage={`${totalsGoal?.percentageComplete ?? 0}%`}
              />
            )}
          </div>
        </div>
        {/* <StatsKpi /> */}
      </div>
    </>
  );
};

export default Dashboard;
