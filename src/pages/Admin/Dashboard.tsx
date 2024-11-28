import StatsKpi from "@/components/Admin/Dashboard/StatsKpi";
import StatsSells from "@/components/Admin/Dashboard/StatsSells";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="mb-8">
          <StatsSells />
        </div>

        <StatsKpi />
      </div>
    </>
  );
};

export default Dashboard;
