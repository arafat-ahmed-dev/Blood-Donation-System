import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export type InventoryStatus = "Adequate" | "Low" | "Critical";

export interface InventoryItem {
  bloodType: string;
  units: number;
  status: InventoryStatus;
}

interface InventoryStatusProps {
  inventory: InventoryItem[];
}

export function InventoryStatus({ inventory }: InventoryStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Blood Inventory Status</CardTitle>
        <CardDescription>
          Current inventory levels by blood type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventory.map((item) => {
            const level =
              item.status === "Critical" ? 20 : item.status === "Low" ? 50 : 75;
            const color =
              item.status === "Critical"
                ? "bg-red-600"
                : item.status === "Low"
                ? "bg-amber-600"
                : "bg-green-600";

            return (
              <div key={item.bloodType} className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold mr-2">
                      {item.bloodType}
                    </div>
                    <span className="font-medium">{item.bloodType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{item.units} units</span>
                    <Badge
                      className={
                        item.status === "Critical"
                          ? "bg-red-600"
                          : item.status === "Low"
                          ? "bg-amber-600"
                          : "bg-green-600"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
                <Progress value={level} className={color} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
