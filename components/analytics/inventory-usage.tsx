import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface UsageData {
  period: string;
  total: number;
  byBloodType: Record<string, number>;
  byPurpose: Record<string, number>;
}

interface InventoryUsageProps {
  usageByPeriod: UsageData[];
}

export function InventoryUsage({ usageByPeriod }: InventoryUsageProps) {
  // Transform data for blood type chart
  const bloodTypeData = usageByPeriod.map((period) => ({
    period: period.period,
    ...period.byBloodType,
  }));

  // Transform data for purpose chart
  const purposeData = usageByPeriod.map((period) => ({
    period: period.period,
    ...period.byPurpose,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Usage</CardTitle>
        <CardDescription>Track blood usage by type and purpose</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Usage by Blood Type</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bloodTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="A+" fill="#8884d8" />
                  <Bar dataKey="O+" fill="#82ca9d" />
                  <Bar dataKey="B+" fill="#ffc658" />
                  <Bar dataKey="AB+" fill="#ff8042" />
                  <Bar dataKey="O-" fill="#0088fe" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Usage by Purpose</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={purposeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Surgery" fill="#8884d8" />
                  <Bar dataKey="Trauma" fill="#82ca9d" />
                  <Bar dataKey="Cancer Treatment" fill="#ffc658" />
                  <Bar dataKey="Other" fill="#ff8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
