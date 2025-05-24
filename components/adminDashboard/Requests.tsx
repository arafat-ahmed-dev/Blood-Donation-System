import React from "react";
import { Button } from "../ui/button";
import {
  AlertCircle,
  Badge,
  CheckCircle,
  Clock,
  FileText,
  Filter,
  Heart,
  Plus,
  Search,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BarChart, PieChart } from "../charts";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { getRequestStatusColor, getUrgencyColor, pendingRequests } from "@/lib/adminData";

function RequestsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Blood Requests</h1>
          <p className="text-muted-foreground">
            Manage and process blood requests from hospitals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Export Requests</span>
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <FileText className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-green-600 mr-1">+8%</span>
              <span className="text-xs text-muted-foreground">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">
                Awaiting processing
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fulfilled</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">This month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Requests
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">
                Require immediate attention
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Blood Requests</CardTitle>
              <CardDescription>
                Manage all blood requests from hospitals and medical facilities
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search requests..."
                  className="w-full pl-8 bg-background rounded-lg border border-input"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="fulfilled">Fulfilled</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <div className="grid grid-cols-7 border-b p-4 font-medium">
              <div>Request ID</div>
              <div>Hospital</div>
              <div>Blood Type</div>
              <div>Units</div>
              <div>Urgency</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            <div className="divide-y">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="grid grid-cols-7 p-4 items-center"
                >
                  <div className="font-medium">{request.id}</div>
                  <div>{request.hospital}</div>
                  <div>{request.bloodType}</div>
                  <div>{request.units} units</div>
                  <div>
                    <Badge className={getUrgencyColor(request.urgency)}>
                      {request.urgency}
                    </Badge>
                  </div>
                  <div>
                    <Badge className={getRequestStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    {request.status === "Pending" && (
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Process
                      </Button>
                    )}
                    {request.status === "Processing" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Complete
                      </Button>
                    )}
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
            <CardTitle>Request Volume by Hospital</CardTitle>
            <CardDescription>Top requesting facilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <BarChart />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Request Status Distribution</CardTitle>
            <CardDescription>Breakdown of request statuses</CardDescription>
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
}

export default RequestsDashboard;
