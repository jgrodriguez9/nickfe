import StatsKpi from "@/components/Admin/Dashboard/StatsKpi";
import StatsSells from "@/components/Admin/Dashboard/StatsSells";
import useGetTotalsQuery from "@/hook/Queries/useGetTotalsQuery";
import parseObjectToQueryUrl from "@/utils/parseObjectToQueryUrl";
import { useState } from "react";

const Dashboard = () => {
  const [query, setQuery] = useState({
    startDate: "",
    endDate: "",
  });
  const { data, isLoading, isError } = useGetTotalsQuery({
    queryPath: `?${parseObjectToQueryUrl(query)}`,
  });
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="mb-8">
          <StatsSells isLoading={isLoading} totals={data} />
        </div>
        <StatsKpi />
      </div>
    </>
  );
};

export default Dashboard;
