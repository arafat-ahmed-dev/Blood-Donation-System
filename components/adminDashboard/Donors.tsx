import React from 'react'
import { Button } from "../ui/button";
import {
  Badge,
  CheckCircle,
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
import Image from "next/image";
import { Input } from '../ui/input';
import { donorDetails } from '@/lib/adminData';

function DonorsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Donor Management</h1>
          <p className="text-muted-foreground">
            View and manage donor information
          </p>
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
              <span className="text-xs text-muted-foreground">
                from last month
              </span>
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
              <span className="text-xs text-muted-foreground">
                Last 3 months
              </span>
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
            <CardTitle className="text-sm font-medium">
              Eligible for Donation
            </CardTitle>
            <Heart className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,156</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">
                Currently eligible
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Donor Directory</CardTitle>
              <CardDescription>
                View and manage all registered donors
              </CardDescription>
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
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
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
              {donorDetails.map((donor) => (
                <div
                  key={donor.id}
                  className="grid grid-cols-7 p-4 items-center"
                >
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
                      <p className="text-xs text-muted-foreground">
                        {donor.email}
                      </p>
                    </div>
                  </div>
                  <div>{donor.bloodType}</div>
                  <div>{donor.lastDonation}</div>
                  <div>{donor.totalDonations}</div>
                  <div>
                    <Badge
                      className={
                        donor.status === "Active"
                          ? "bg-green-600"
                          : "bg-slate-600"
                      }
                    >
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
  );
}

export default DonorsDashboard