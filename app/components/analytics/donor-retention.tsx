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

interface RetentionData {
  period: string;
  activeDonors: number;
  newDonors: number;
  retentionRate: number;
}

interface DonorRetentionProps {
  existingDonors: number;
  retentionByPeriod: RetentionData[];
}

export function DonorRetention({
  existingDonors,
  retentionByPeriod,
}: DonorRetentionProps) {
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
        <CardTitle>Donor Retention</CardTitle>
        <CardDescription>
          Track donor engagement and retention rates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Existing Donors
              </p>
              <p className="text-2xl font-bold">{existingDonors}</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={retentionByPeriod}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" tickFormatter={formatPeriodLabel} />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Retention Rate"]}
                  labelFormatter={formatPeriodLabel}
                />
                <Area
                  type="monotone"
                  dataKey="retentionRate"
                  stroke="#8884d8"
                  fill="#8884d8"
                  name="Retention Rate (%)"
                />
                <Area
                  type="monotone"
                  dataKey="newDonors"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  name="New Donors"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
