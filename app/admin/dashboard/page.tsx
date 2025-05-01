"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AreaChart, BarChart, PieChart } from "@/components/charts"
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
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const bloodInventory = [
    { type: "A+", level: 75, status: "Adequate", units: 120 },
    { type: "A-", level: 45, status: "Low", units: 45 },
    { type: "B+", level: 60, status: "Adequate", units: 80 },
    { type: "B-", level: 30, status: "Critical", units: 15 },
    { type: "AB+", level: 80, status: "Adequate", units: 50 },
    { type: "AB-", level: 25, status: "Critical", units: 10 },
    { type: "O+", level: 50, status: "Low", units: 90 },
    { type: "O-", level: 20, status: "Critical", units: 25 },
  ]

  const recentDonors = [
    {
      id: "D-1001",
      name: "John Smith",
      bloodType: "O+",
      donationDate: "Apr 25, 2024",
      location: "City General Hospital",
      status: "Completed",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "D-1002",
      name: "Sarah Johnson",
      bloodType: "A-",
      donationDate: "Apr 24, 2024",
      location: "Downtown Blood Center",
      status: "Completed",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "D-1003",
      name: "Michael Chen",
      bloodType: "B+",
      donationDate: "Apr 24, 2024",
      location: "University Hospital",
      status: "Processing",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "D-1004",
      name: "Emily Rodriguez",
      bloodType: "AB-",
      donationDate: "Apr 23, 2024",
      location: "Westside Medical Center",
      status: "Completed",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "D-1005",
      name: "David Wilson",
      bloodType: "O-",
      donationDate: "Apr 23, 2024",
      location: "Mobile Donation Unit #2",
      status: "Processing",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const pendingRequests = [
    {
      id: "REQ-1239",
      hospital: "City General Hospital",
      bloodType: "O-",
      units: 3,
      urgency: "Critical",
      requestedDate: "Apr 25, 2024",
      status: "Pending",
    },
    {
      id: "REQ-1240",
      hospital: "Children's Medical Center",
      bloodType: "B-",
      units: 2,
      urgency: "High",
      requestedDate: "Apr 25, 2024",
      status: "Pending",
    },
    {
      id: "REQ-1241",
      hospital: "Memorial Hospital",
      bloodType: "AB+",
      units: 1,
      urgency: "Medium",
      requestedDate: "Apr 24, 2024",
      status: "Processing",
    },
    {
      id: "REQ-1242",
      hospital: "University Hospital",
      bloodType: "A+",
      units: 4,
      urgency: "Medium",
      requestedDate: "Apr 24, 2024",
      status: "Processing",
    },
    {
      id: "REQ-1243",
      hospital: "Veterans Medical Center",
      bloodType: "O+",
      units: 2,
      urgency: "High",
      requestedDate: "Apr 23, 2024",
      status: "Processing",
    },
  ]

  const upcomingAppointments = [
    {
      id: "APT-2001",
      donorName: "Jessica Lee",
      bloodType: "A+",
      date: "Apr 26, 2024",
      time: "10:00 AM",
      location: "Downtown Blood Center",
      status: "Confirmed",
    },
    {
      id: "APT-2002",
      donorName: "Robert Brown",
      bloodType: "O-",
      date: "Apr 26, 2024",
      time: "11:30 AM",
      location: "City General Hospital",
      status: "Confirmed",
    },
    {
      id: "APT-2003",
      donorName: "Amanda Garcia",
      bloodType: "B+",
      date: "Apr 26, 2024",
      time: "2:00 PM",
      location: "Westside Medical Center",
      status: "Pending",
    },
    {
      id: "APT-2004",
      donorName: "Thomas Wilson",
      bloodType: "AB-",
      date: "Apr 27, 2024",
      time: "9:15 AM",
      location: "University Hospital",
      status: "Confirmed",
    },
    {
      id: "APT-2005",
      donorName: "Lisa Martinez",
      bloodType: "O+",
      date: "Apr 27, 2024",
      time: "3:45 PM",
      location: "Downtown Blood Center",
      status: "Pending",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Adequate":
        return "text-green-600"
      case "Low":
        return "text-amber-600"
      case "Critical":
        return "text-red-600"
      default:
        return ""
    }
  }

  const getProgressColor = (level: number) => {
    if (level > 60) return "bg-green-600"
    if (level > 40) return "bg-amber-600"
    return "bg-red-600"
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-600"
      case "High":
        return "bg-amber-600"
      case "Medium":
        return "bg-blue-600"
      case "Low":
        return "bg-green-600"
      default:
        return "bg-slate-600"
    }
  }

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-600"
      case "Pending":
        return "bg-amber-600"
      case "Cancelled":
        return "bg-red-600"
      default:
        return "bg-slate-600"
    }
  }

  const getDonationStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-600"
      case "Processing":
        return "bg-blue-600"
      case "Failed":
        return "bg-red-600"
      default:
        return "bg-slate-600"
    }
  }

  const getRequestStatusColor = (status: string) => {
    switch (status) {
      case "Fulfilled":
        return "bg-green-600"
      case "Processing":
        return "bg-blue-600"
      case "Pending":
        return "bg-amber-600"
      case "Cancelled":
        return "bg-red-600"
      default:
        return "bg-slate-600"
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 flex-col fixed inset-y-0 border-r bg-background z-30">
        <div className="flex items-center gap-2 px-6 py-4 border-b">
          <Heart className="h-6 w-6 text-red-600" />
          <span className="text-xl font-bold">LifeFlow Admin</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-4 py-4 space-y-1">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                selectedTab === "overview" ? "bg-red-100 text-red-600" : "hover:bg-muted"
              }`}
              onClick={() => setSelectedTab("overview")}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Overview</span>
            </Link>
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                selectedTab === "inventory" ? "bg-red-100 text-red-600" : "hover:bg-muted"
              }`}
              onClick={() => setSelectedTab("inventory")}
            >
              <Droplet className="h-5 w-5" />
              <span>Blood Inventory</span>
            </Link>
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                selectedTab === "donors" ? "bg-red-100 text-red-600" : "hover:bg-muted"
              }`}
              onClick={() => setSelectedTab("donors")}
            >
              <Users className="h-5 w-5" />
              <span>Donors</span>
            </Link>
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                selectedTab === "requests" ? "bg-red-100 text-red-600" : "hover:bg-muted"
              }`}
              onClick={() => setSelectedTab("requests")}
            >
              <Heart className="h-5 w-5" />
              <span>Blood Requests</span>
            </Link>
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                selectedTab === "appointments" ? "bg-red-100 text-red-600" : "hover:bg-muted"
              }`}
              onClick={() => setSelectedTab("appointments")}
            >
              <Calendar className="h-5 w-5" />
              <span>Appointments</span>
            </Link>
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                selectedTab === "centers" ? "bg-red-100 text-red-600" : "hover:bg-muted"
              }`}
              onClick={() => setSelectedTab("centers")}
            >
              <MapPin className="h-5 w-5" />
              <span>Donation Centers</span>
            </Link>
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                selectedTab === "reports" ? "bg-red-100 text-red-600" : "hover:bg-muted"
              }`}
              onClick={() => setSelectedTab("reports")}
            >
              <FileText className="h-5 w-5" />
              <span>Reports</span>
            </Link>
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                selectedTab === "settings" ? "bg-red-100 text-red-600" : "hover:bg-muted"
              }`}
              onClick={() => setSelectedTab("settings")}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image src="/placeholder.svg?height=32&width=32" alt="Admin" fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@lifeflow.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        {/* Top Navigation */}
        <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex lg:hidden items-center gap-2">
            <Heart className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold">LifeFlow Admin</span>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="relative w-full max-w-sm hidden md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8 bg-background rounded-lg border border-input"
              />
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-600"></span>
            </Button>
            <div className="relative flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=32&width=32" alt="Admin" fill className="object-cover" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium">Admin User</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6">
          {/* Overview Tab */}
          {selectedTab === "overview" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                  <p className="text-muted-foreground">Welcome back, Admin User</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Export Report</span>
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
                    <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                    <Droplet className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,248</div>
                    <div className="flex items-center pt-1">
                      <span className="text-xs text-green-600 mr-1">+12%</span>
                      <span className="text-xs text-muted-foreground">from last month</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
                    <Users className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">573</div>
                    <div className="flex items-center pt-1">
                      <span className="text-xs text-green-600 mr-1">+5%</span>
                      <span className="text-xs text-muted-foreground">from last month</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <div className="flex items-center pt-1">
                      <span className="text-xs text-red-600 mr-1">+18%</span>
                      <span className="text-xs text-muted-foreground">from last month</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Critical Inventory</CardTitle>
                    <Activity className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <div className="flex items-center pt-1">
                      <span className="text-xs text-muted-foreground">Blood types: O-, B-, AB-</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-7">
                <Card className="md:col-span-4">
                  <CardHeader>
                    <CardTitle>Donation Trends</CardTitle>
                    <CardDescription>Daily donation volume over the past 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <AreaChart />
                    </div>
                  </CardContent>
                </Card>
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Blood Type Distribution</CardTitle>
                    <CardDescription>Current inventory by blood type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <PieChart />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Donations</CardTitle>
                      <Button variant="ghost" className="text-sm text-red-600">
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentDonors.map((donor) => (
                        <div key={donor.id} className="flex items-center gap-4">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={donor.image || "/placeholder.svg"}
                              alt={donor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{donor.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{donor.bloodType}</span>
                              <span>•</span>
                              <span>{donor.donationDate}</span>
                            </div>
                          </div>
                          <Badge className={getDonationStatusColor(donor.status)}>{donor.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Pending Requests</CardTitle>
                      <Button variant="ghost" className="text-sm text-red-600">
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingRequests.slice(0, 5).map((request) => (
                        <div key={request.id} className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-700 font-bold text-sm">
                            {request.bloodType}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{request.hospital}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{request.units} units</span>
                              <span>•</span>
                              <span>{request.requestedDate}</span>
                            </div>
                          </div>
                          <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Inventory Tab */}
          {selectedTab === "inventory" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Blood Inventory Management</h1>
                  <p className="text-muted-foreground">Monitor and manage blood supply levels</p>
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
                      <span className="text-xs text-muted-foreground">from last week</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Critical Types</CardTitle>
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
                      <span className="text-xs text-muted-foreground">Within 7 days</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Incoming Units</CardTitle>
                    <Truck className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <div className="flex items-center pt-1">
                      <span className="text-xs text-muted-foreground">Expected today</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Blood Inventory Levels</CardTitle>
                      <CardDescription>Current stock levels by blood type</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
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
                        <div key={blood.type} className="grid grid-cols-6 p-4 items-center">
                          <div className="font-medium">{blood.type}</div>
                          <div className="col-span-2 flex items-center gap-2">
                            <Progress value={blood.level} className={`w-full ${getProgressColor(blood.level)}`} />
                            <span className="text-sm">{blood.level}%</span>
                          </div>
                          <div className={`font-medium ${getStatusColor(blood.status)}`}>{blood.status}</div>
                          <div>{blood.units} units</div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Update
                            </Button>
                            <Button
                              size="sm"
                              className={blood.status === "Critical" ? "bg-red-600 hover:bg-red-700" : ""}
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
                    <CardDescription>Percentage breakdown of current inventory</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <PieChart />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Donors Tab */}
          {selectedTab === "donors" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Donor Management</h1>
                  <p className="text-muted-foreground">View and manage donor information</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Export List</span>
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Donor
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
                    <Users className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4,235</div>
                    <div className="flex items-center pt-1">
                      <span className="text-xs text-green-600 mr-1">+3%</span>
                      <span className="text-xs text-muted-foreground">from last month</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">573</div>
                    <div className="flex items-center pt-1">
                      <span className="text-xs text-muted-foreground">Last 3 months</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">New Donors</CardTitle>
                    <Plus className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">128</div>
                    <div className="flex items-center pt-1">
                      <span className="text-xs text-green-600 mr-1">+15%</span>
                      <span className="text-xs text-muted-foreground">this month</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Eligible for Donation</CardTitle>
                    <Heart className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,156</div>
                    <div className="flex items-center pt-1">
                      <span className="text-xs text-muted-foreground">Currently eligible</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Donor Directory</CardTitle>
                      <CardDescription>View and manage all registered donors</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search donors..."
                          className="w-full pl-8 bg-background rounded-lg border border-input"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border">
                    <div className="grid grid-cols-7 border-b p-4 font-medium">
                      <div className="col-span-2">Donor</div>
                      <div>Blood Type</div>
                      <div>Last Donation</div>
                      <div>Total Donations</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    <div className="divide-y">
                      {[
                        {
                          id: "D-1001",
                          name: "John Smith",
                          email: "john.smith@example.com",
                          bloodType: "O+",
                          lastDonation: "Apr 25, 2024",
                          totalDonations: 12,
                          status: "Active",
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          id: "D-1002",
                          name: "Sarah Johnson",
                          email: "sarah.j@example.com",
                          bloodType: "A-",
                          lastDonation: "Apr 24, 2024",
                          totalDonations: 8,
                          status: "Active",
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          id: "D-1003",
                          name: "Michael Chen",
                          email: "m.chen@example.com",
                          bloodType: "B+",
                          lastDonation: "Apr 24, 2024",
                          totalDonations: 5,
                          status: "Active",
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          id: "D-1004",
                          name: "Emily Rodriguez",
                          email: "e.rodriguez@example.com",
                          bloodType: "AB-",
                          lastDonation: "Apr 23, 2024",
                          totalDonations: 3,
                          status: "Active",
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          id: "D-1005",
                          name: "David Wilson",
                          email: "d.wilson@example.com",
                          bloodType: "O-",
                          lastDonation: "Apr 23, 2024",
                          totalDonations: 15,
                          status: "Active",
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          id: "D-1006",
                          name: "Jessica Lee",
                          email: "j.lee@example.com",
                          bloodType: "A+",
                          lastDonation: "Mar 15, 2024",
                          totalDonations: 7,
                          status: "Inactive",
                          image: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          id: "D-1007",
                          name: "Robert Brown",
                          email: "r.brown@example.com",
                          bloodType: "O-",
                          lastDonation: "Feb 28, 2024",
                          totalDonations: 20,
                          status: "Inactive",
                          image: "/placeholder.svg?height=40&width=40",
                        },
                      ].map((donor) => (
                        <div key={donor.id} className="grid grid-cols-7 p-4 items-center">
                          <div className="col-span-2 flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                              <Image
                                src={donor.image || "/placeholder.svg"}
                                alt={donor.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{donor.name}</p>
                              <p className="text-xs text-muted-foreground">{donor.email}</p>
                            </div>
                          </div>
                          <div>{donor.bloodType}</div>
                          <div>{donor.lastDonation}</div>
                          <div>{donor.totalDonations}</div>
                          <div>
                            <Badge className={donor.status === "Active" ? "bg-green-600" : "bg-slate-600"}>
                              {donor.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              Contact
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
                    <CardTitle>Donor Demographics</CardTitle>
                    <CardDescription>Age and gender distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <BarChart />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Donation Frequency</CardTitle>
                    <CardDescription>Number of donations per donor</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <PieChart />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Requests Tab */}
          {selectedTab === "requests" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Blood Requests</h1>
                  <p className="text-muted-foreground">Manage and process blood requests from hospitals</p>
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
                    <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                    <FileText className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">124</div>
                    <div className="flex items-center pt-1">
                      <span className="text-xs text-green-600 mr-1">+8%</span>
                      <span className="text-xs text-muted-foreground">from last month</span>
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
                      <span className="text-xs text-muted-foreground">Awaiting processing</span>
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
                    <CardTitle className="text-sm font-medium">Critical Requests</CardTitle>
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <div className="flex items-center pt-1">
                      <span className="text-xs text-muted-foreground">Require immediate attention</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Blood Requests</CardTitle>
                      <CardDescription>Manage all blood requests from hospitals and medical facilities</CardDescription>
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
                      {[
                        ...pendingRequests,
                        {
                          id: "REQ-1244",
                          hospital: "St. Mary's Hospital",
                          bloodType: "A-",
                          units: 2,
                          urgency: "Medium",
                          requestedDate: "Apr 22, 2024",
                          status: "Fulfilled",
                        },
                        {
                          id: "REQ-1245",
                          hospital: "County General",
                          bloodType: "O+",
                          units: 3,
                          urgency: "High",
                          requestedDate: "Apr 21, 2024",
                          status: "Fulfilled",
                        },
                        {
                          id: "REQ-1246",
                          hospital: "Children's Medical Center",
                          bloodType: "AB+",
                          units: 1,
                          urgency: "Low",
                          requestedDate: "Apr 20, 2024",
                          status: "Cancelled",
                        },
                      ].map((request) => (
                        <div key={request.id} className="grid grid-cols-7 p-4 items-center">
                          <div className="font-medium">{request.id}</div>
                          <div>{request.hospital}</div>
                          <div>{request.bloodType}</div>
                          <div>{request.units} units</div>
                          <div>
                            <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                          </div>
                          <div>
                            <Badge className={getRequestStatusColor(request.status)}>{request.status}</Badge>
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
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
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
          )}

          {/* Appointments Tab */}
          {selectedTab === "appointments" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Appointment Management</h1>
                  <p className="text-muted-foreground">Schedule and manage donor appointments</p>
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
                    <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                    <Calendar className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <div className="flex items-center pt-1">
                      <span className="text-xs text-muted-foreground">5 completed, 13 remaining</span>
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
                      <span className="text-xs text-muted-foreground">from last week</span>
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
                      <span className="text-xs text-muted-foreground">from last week</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Available Slots</CardTitle>
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
                      <CardDescription>View and manage scheduled donor appointments</CardDescription>
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
                        <div key={appointment.id} className="grid grid-cols-7 p-4 items-center">
                          <div className="font-medium">{appointment.id}</div>
                          <div>{appointment.donorName}</div>
                          <div>{appointment.bloodType}</div>
                          <div>
                            {appointment.date}
                            <br />
                            <span className="text-xs text-muted-foreground">{appointment.time}</span>
                          </div>
                          <div>{appointment.location}</div>
                          <div>
                            <Badge className={getAppointmentStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {appointment.status === "Pending" && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
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
                    <CardDescription>Current appointment status breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <PieChart />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {selectedTab === "reports" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Reports & Analytics</h1>
                  <p className="text-muted-foreground">View and generate detailed reports</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Export Data</span>
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="mr-2 h-4 w-4" />
                    New Report
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-red-600" />
                      <CardTitle>Donation Trends</CardTitle>
                    </div>
                    <CardDescription>Monthly donation volume analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                      <span>Last updated: Today, 9:45 AM</span>
                      <Button variant="ghost" size="sm" className="h-8 text-red-600">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <PieChartIcon className="h-5 w-5 text-red-600" />
                      <CardTitle>Inventory Analysis</CardTitle>
                    </div>
                    <CardDescription>Blood type distribution and usage</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                      <span>Last updated: Today, 8:30 AM</span>
                      <Button variant="ghost" size="sm" className="h-8 text-red-600">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-red-600" />
                      <CardTitle>Donor Demographics</CardTitle>
                    </div>
                    <CardDescription>Age, gender, and location analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                      <span>Last updated: Yesterday, 5:15 PM</span>
                      <Button variant="ghost" size="sm" className="h-8 text-red-600">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Available Reports</CardTitle>
                      <CardDescription>View and download system reports</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="inventory">Inventory</SelectItem>
                          <SelectItem value="donors">Donors</SelectItem>
                          <SelectItem value="requests">Requests</SelectItem>
                          <SelectItem value="appointments">Appointments</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="search"
                        placeholder="Search reports..."
                        className="w-full max-w-sm bg-background rounded-lg border border-input"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border">
                    <div className="grid grid-cols-6 border-b p-4 font-medium">
                      <div className="col-span-2">Report Name</div>
                      <div>Category</div>
                      <div>Last Generated</div>
                      <div>Format</div>
                      <div>Actions</div>
                    </div>
                    <div className="divide-y">
                      {[
                        {
                          name: "Monthly Donation Summary",
                          category: "Donations",
                          lastGenerated: "Apr 25, 2024",
                          format: "PDF, Excel",
                        },
                        {
                          name: "Blood Inventory Status",
                          category: "Inventory",
                          lastGenerated: "Apr 25, 2024",
                          format: "PDF, Excel",
                        },
                        {
                          name: "Donor Activity Report",
                          category: "Donors",
                          lastGenerated: "Apr 24, 2024",
                          format: "PDF, Excel",
                        },
                        {
                          name: "Hospital Request Analysis",
                          category: "Requests",
                          lastGenerated: "Apr 23, 2024",
                          format: "PDF, Excel",
                        },
                        {
                          name: "Appointment Fulfillment Rate",
                          category: "Appointments",
                          lastGenerated: "Apr 22, 2024",
                          format: "PDF, Excel",
                        },
                        {
                          name: "Critical Blood Type Alert",
                          category: "Inventory",
                          lastGenerated: "Apr 22, 2024",
                          format: "PDF, Excel",
                        },
                        {
                          name: "Donation Center Performance",
                          category: "Centers",
                          lastGenerated: "Apr 21, 2024",
                          format: "PDF, Excel",
                        },
                      ].map((report, index) => (
                        <div key={index} className="grid grid-cols-6 p-4 items-center">
                          <div className="col-span-2 font-medium">{report.name}</div>
                          <div>{report.category}</div>
                          <div>{report.lastGenerated}</div>
                          <div>{report.format}</div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              Download
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
                    <CardTitle>Donation Trends</CardTitle>
                    <CardDescription>Monthly donation volume over the past year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <AreaChart />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Request Fulfillment Rate</CardTitle>
                    <CardDescription>Percentage of fulfilled requests by blood type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <BarChart />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
