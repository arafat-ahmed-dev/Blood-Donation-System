import React from "react";
import { Button } from "../ui/button";
import {
  AlertCircle,
  Badge,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Filter,
  Heart,
  Plus,
  Search,
  Users,
  XCircle,
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
import { getAppointmentStatusColor, upcomingAppointments } from "@/lib/adminData";

function AppointmentsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Appointment Management</h1>
          <p className="text-muted-foreground">
            Schedule and manage donor appointments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>View Calendar</span>
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">
                5 completed, 13 remaining
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-green-600 mr-1">+12%</span>
              <span className="text-xs text-muted-foreground">
                from last week
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">No-Shows</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-green-600 mr-1">-3%</span>
              <span className="text-xs text-muted-foreground">
                from last week
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Available Slots
            </CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">Next 7 days</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                View and manage scheduled donor appointments
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Input type="date" className="w-[180px]" />
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <div className="grid grid-cols-7 border-b p-4 font-medium">
              <div>Appointment ID</div>
              <div>Donor</div>
              <div>Blood Type</div>
              <div>Date & Time</div>
              <div>Location</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            <div className="divide-y">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="grid grid-cols-7 p-4 items-center"
                >
                  <div className="font-medium">{appointment.id}</div>
                  <div>{appointment.donorName}</div>
                  <div>{appointment.bloodType}</div>
                  <div>
                    {appointment.date}
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {appointment.time}
                    </span>
                  </div>
                  <div>{appointment.location}</div>
                  <div>
                    <Badge
                      className={getAppointmentStatusColor(appointment.status)}
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    {appointment.status === "Pending" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Confirm
                      </Button>
                    )}
                    {appointment.status === "Confirmed" && (
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Check In
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
            <CardTitle>Appointment Distribution</CardTitle>
            <CardDescription>Appointments by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <BarChart />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appointment Status</CardTitle>
            <CardDescription>
              Current appointment status breakdown
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
}

export default AppointmentsDashboard;
