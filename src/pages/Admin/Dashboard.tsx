import KpiCard from "@/components/Admin/Dashboard/KPI/KpiCard";
import StatsSells from "@/components/Admin/Dashboard/StatsSells";
import { ChartConfig } from "@/components/ui/chart";
import useGetTotalEarningsQuery from "@/hook/Queries/useGetTotalEarningsQuery";
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

const Dashboard = () => {
  const [query, setQuery] = useState({
    startDate: "",
    endDate: "",
  });
  const { data, isLoading, isError } = useGetTotalsQuery({
    queryPath: `?${parseObjectToQueryUrl(query)}`,
  });

  const { data: totalsEarning, isLoading: isLoadingEarnings } =
    useGetTotalEarningsQuery({
      queryPath: `?${parseObjectToQueryUrl(query)}`,
    });
  console.log(totalsEarning);

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
            {!isLoadingEarnings && !isError && (
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
        </div>
        {/* <StatsKpi /> */}
      </div>
    </>
  );
};

export default Dashboard;
