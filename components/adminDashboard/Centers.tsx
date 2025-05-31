import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DONATION_CENTERS } from "@/lib/adminData";
import { MapPin, Phone, Clock, Plus, Edit, Trash2 } from "lucide-react";

export default function DonationCentersDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Donation Centers Management</h1>
          <p className="text-muted-foreground">
            Manage and monitor all donation centers
          </p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" /> Add New Center
        </Button>
      </div>

      <Tabs defaultValue="centers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="centers">All Centers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
        </TabsList>

        <TabsContent value="centers">
          <div className="grid gap-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="Search centers..." />
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Filter by Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Under Maintenance</option>
                  </select>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Sort by</option>
                    <option value="name">Name</option>
                    <option value="status">Status</option>
                    <option value="staff">Staff Count</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Centers List */}
            <div className="grid gap-4">
              {DONATION_CENTERS.map((center) => (
                <Card key={center.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">
                            {center.name}
                          </h3>
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                            {center.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> {center.address}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" /> {center.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" /> {center.hours}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="text-sm text-muted-foreground">
                          <div>Staff: {center.staff}</div>
                          <div>Last updated: {center.lastUpdated}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,234</div>
                <p className="text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Centers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-muted-foreground">Out of 10 total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">45</div>
                <p className="text-muted-foreground">Across all centers</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scheduling">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Center</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="">Select a center</option>
                      {DONATION_CENTERS.map((center) => (
                        <option key={center.id} value={center.id}>
                          {center.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Operating Hours</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="time" placeholder="Start Time" />
                    <Input type="time" placeholder="End Time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Staff Assignment</Label>
                  <select className="w-full p-2 border rounded-md" multiple>
                    <option value="1">Dr. John Doe</option>
                    <option value="2">Nurse Sarah Smith</option>
                    <option value="3">Tech James Wilson</option>
                  </select>
                </div>
                <Button className="bg-red-600 hover:bg-red-700">
                  Update Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
