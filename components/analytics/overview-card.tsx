import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface OverviewCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function OverviewCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-red-600",
  trend,
}: OverviewCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <div className="flex items-center pt-1">
            {trend && (
              <span
                className={`text-xs ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                } mr-1`}
              >
                {trend.isPositive ? "+" : "-"}
                {trend.value}%
              </span>
            )}
            <span className="text-xs text-muted-foreground">{description}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
