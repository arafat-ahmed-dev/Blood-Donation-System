import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface DonationTrend {
  period: string;
  total: number;
  byBloodType: Record<string, number>;
}

interface DonationTrendsProps {
  trends: DonationTrend[];
  period: "week" | "month" | "year";
}

export function DonationTrends({ trends, period }: DonationTrendsProps) {
  const formatPeriodLabel = (periodKey: string) => {
    if (periodKey.includes("-W")) {
      const [year, week] = periodKey.split("-W");
      return `Week ${week}, ${year}`;
    } else if (periodKey.includes("-")) {
      const [year, month] = periodKey.split("-");
      const date = new Date(
        Number.parseInt(year),
        Number.parseInt(month) - 1,
        1
      );
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    }
    return periodKey;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Donation Trends</CardTitle>
        <CardDescription>
          {period === "week"
            ? "Weekly"
            : period === "month"
            ? "Monthly"
            : "Yearly"}{" "}
          donation volume over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={trends}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" tickFormatter={formatPeriodLabel} />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value} units`, "Donations"]}
                labelFormatter={formatPeriodLabel}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#ef4444"
                fill="#fee2e2"
                activeDot={{ r: 8 }}
                name="Total Donations"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
