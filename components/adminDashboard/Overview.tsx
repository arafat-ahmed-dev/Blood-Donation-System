import React from 'react'
import { Button } from '../ui/button';
import { Activity, AlertCircle, Badge, Droplet, FileText, Plus, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { AreaChart, PieChart } from '../charts';
import Image from 'next/image';
import { getDonationStatusColor, getUrgencyColor, pendingRequests, recentDonors } from '@/lib/adminData';

function OverviewDashboard () {
  return (
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
            <CardTitle className="text-sm font-medium">
              Total Donations
            </CardTitle>
            <Droplet className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-green-600 mr-1">+12%</span>
              <span className="text-xs text-muted-foreground">
                from last month
              </span>
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
              <span className="text-xs text-muted-foreground">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-red-600 mr-1">+18%</span>
              <span className="text-xs text-muted-foreground">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Inventory
            </CardTitle>
            <Activity className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">
                Blood types: O-, B-, AB-
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Donation Trends</CardTitle>
            <CardDescription>
              Daily donation volume over the past 30 days
            </CardDescription>
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
                  <Badge className={getDonationStatusColor(donor.status)}>
                    {donor.status}
                  </Badge>
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
                  <Badge className={getUrgencyColor(request.urgency)}>
                    {request.urgency}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewDashboard