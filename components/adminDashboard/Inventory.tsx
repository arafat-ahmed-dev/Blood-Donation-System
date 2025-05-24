import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AreaChart, BarChart, PieChart } from "@/components/charts";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Droplet,
  FileText,
  Filter,
  Heart,
  LayoutDashboard,
  LineChart,
  MapPin,
  PieChartIcon,
  Plus,
  Search,
  Settings,
  Truck,
  Users,
  XCircle,
} from "lucide-react";
import { bloodInventory, getProgressColor, getStatusColor } from "@/lib/adminData";

export default function InventoryDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Blood Inventory Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage blood supply levels
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span>Record Transfer</span>
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Inventory
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Droplet className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">435</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-green-600 mr-1">+8%</span>
              <span className="text-xs text-muted-foreground">
                from last week
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Types
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">O-, B-, AB-</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">
                Within 7 days
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Incoming Units
            </CardTitle>
            <Truck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">
                Expected today
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Blood Inventory Levels</CardTitle>
              <CardDescription>
                Current stock levels by blood type
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="critical">Critical Only</SelectItem>
                  <SelectItem value="low">Low Only</SelectItem>
                  <SelectItem value="adequate">Adequate Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <div className="grid grid-cols-6 border-b p-4 font-medium">
              <div>Blood Type</div>
              <div className="col-span-2">Current Level</div>
              <div>Status</div>
              <div>Units</div>
              <div>Actions</div>
            </div>
            <div className="divide-y">
              {bloodInventory.map((blood) => (
                <div
                  key={blood.type}
                  className="grid grid-cols-6 p-4 items-center"
                >
                  <div className="font-medium">{blood.type}</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Progress
                      value={blood.level}
                      className={`w-full ${getProgressColor(blood.level)}`}
                    />
                    <span className="text-sm">{blood.level}%</span>
                  </div>
                  <div
                    className={`font-medium ${getStatusColor(blood.status)}`}
                  >
                    {blood.status}
                  </div>
                  <div>{blood.units} units</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                    <Button
                      size="sm"
                      className={
                        blood.status === "Critical"
                          ? "bg-red-600 hover:bg-red-700"
                          : ""
                      }
                    >
                      Request
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Trends</CardTitle>
            <CardDescription>Blood supply levels over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <LineChart />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribution by Blood Type</CardTitle>
            <CardDescription>
              Percentage breakdown of current inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

