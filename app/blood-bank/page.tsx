import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Droplet, Users, TrendingUp, AlertCircle } from "lucide-react"

export default function BloodBankPage() {
  const bloodTypes = [
    { type: "A+", level: 75, status: "Adequate" },
    { type: "A-", level: 45, status: "Low" },
    { type: "B+", level: 60, status: "Adequate" },
    { type: "B-", level: 30, status: "Critical" },
    { type: "AB+", level: 80, status: "Adequate" },
    { type: "AB-", level: 25, status: "Critical" },
    { type: "O+", level: 50, status: "Low" },
    { type: "O-", level: 20, status: "Critical" },
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

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Blood Bank Inventory</h1>
        <p className="text-muted-foreground">Current blood supply levels and donation statistics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Droplet className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Critical Needs</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">O-, B-, AB-</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+8.2%</div>
            <p className="text-xs text-muted-foreground">Overall inventory growth</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="mt-8">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="inventory">Inventory Levels</TabsTrigger>
          <TabsTrigger value="requests">Recent Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {bloodTypes.map((blood) => (
              <Card key={blood.type}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">{blood.type}</CardTitle>
                    <span className={`text-sm font-medium ${getStatusColor(blood.status)}`}>{blood.status}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-1">
                    <Progress value={blood.level} className={getProgressColor(blood.level)} />
                    <span className="text-sm">{blood.level}%</span>
                  </div>
                  {blood.status === "Critical" && (
                    <Button size="sm" className="mt-2 w-full bg-red-600 hover:bg-red-700">
                      Donate Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="requests" className="mt-6">
          <div className="rounded-lg border">
            <div className="grid grid-cols-5 border-b p-4 font-medium">
              <div>Request ID</div>
              <div>Blood Type</div>
              <div>Quantity</div>
              <div>Hospital</div>
              <div>Status</div>
            </div>
            <div className="divide-y">
              {[
                { id: "REQ-1234", type: "O-", quantity: "3 units", hospital: "City General", status: "Urgent" },
                {
                  id: "REQ-1235",
                  type: "AB+",
                  quantity: "2 units",
                  hospital: "Memorial Hospital",
                  status: "Fulfilled",
                },
                { id: "REQ-1236", type: "B-", quantity: "1 unit", hospital: "Children's Medical", status: "Urgent" },
                {
                  id: "REQ-1237",
                  type: "A+",
                  quantity: "4 units",
                  hospital: "University Hospital",
                  status: "In Progress",
                },
                { id: "REQ-1238", type: "O+", quantity: "2 units", hospital: "Veterans Medical", status: "Fulfilled" },
              ].map((request) => (
                <div key={request.id} className="grid grid-cols-5 p-4">
                  <div>{request.id}</div>
                  <div>{request.type}</div>
                  <div>{request.quantity}</div>
                  <div>{request.hospital}</div>
                  <div
                    className={`font-medium ${
                      request.status === "Urgent"
                        ? "text-red-600"
                        : request.status === "In Progress"
                          ? "text-amber-600"
                          : "text-green-600"
                    }`}
                  >
                    {request.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
