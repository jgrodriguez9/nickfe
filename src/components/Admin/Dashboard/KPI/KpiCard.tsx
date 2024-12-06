import Card from "@/components/Common/Card";
import Spinner from "@/components/Loader/Spinner";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { Label, Line, LineChart, Pie, PieChart, XAxis } from "recharts";

type Props = {
  title: string;
  chartType: "lineal" | "pie";
  chartData: any;
  chartConfig: ChartConfig;
  subTitle: string;
  total: string;
  percentage?: string;
};

const KpiCard = ({
  title,
  chartType,
  chartData,
  chartConfig,
  subTitle,
  total,
  percentage,
}: Props) => {
  const chart = useMemo(() => {
    switch (chartType) {
      case "lineal":
        return (
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="amount"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={1}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        );
      case "pie":
        return (
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {percentage}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Goal complete
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        );
      default:
        return <></>;
    }
  }, [chartType]);

  return (
    <Card extraClasses="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="tracking-tight text-sm font-normal">{title}</div>
      </div>
      <div className="text-2xl font-bold">{total}</div>
      <p className="mb-5 text-xs text-muted-foreground">{subTitle}</p>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        {chart}
      </ChartContainer>
    </Card>
  );
};

export default KpiCard;
