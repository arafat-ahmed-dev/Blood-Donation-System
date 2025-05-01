import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Clock, MapPin, Phone } from "lucide-react"

export default function UrgentRequestPage() {
  const urgentRequests = [
    {
      id: "UR-001",
      bloodType: "O-",
      hospital: "City General Hospital",
      location: "123 Medical Drive, Cityville",
      requiredUnits: 3,
      timePosted: "2 hours ago",
      contact: "(555) 123-4567",
      details: "Needed for emergency surgery following a car accident. Critical situation.",
    },
    {
      id: "UR-002",
      bloodType: "B-",
      hospital: "Children's Medical Center",
      location: "456 Pediatric Lane, Townsville",
      requiredUnits: 2,
      timePosted: "5 hours ago",
      contact: "(555) 987-6543",
      details: "Needed for a 7-year-old child with leukemia undergoing emergency treatment.",
    },
    {
      id: "UR-003",
      bloodType: "AB-",
      hospital: "Memorial Hospital",
      location: "789 Healthcare Blvd, Villageton",
      requiredUnits: 1,
      timePosted: "1 day ago",
      contact: "(555) 456-7890",
      details: "Required for a patient with rare blood type undergoing heart surgery.",
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Urgent Blood Requests</h1>
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <p className="text-muted-foreground">
          These requests need immediate attention. If you can donate, please contact the hospital directly.
        </p>
      </div>

      <Tabs defaultValue="requests" className="mb-8">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="requests">Current Requests</TabsTrigger>
          <TabsTrigger value="create">Create Request</TabsTrigger>
        </TabsList>
        <TabsContent value="requests" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {urgentRequests.map((request) => (
              <Card key={request.id} className="border-red-200">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-700 font-bold">
                        {request.bloodType}
                      </div>
                      <div>
                        <CardTitle>{request.hospital}</CardTitle>
                        <CardDescription>Request ID: {request.id}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{request.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Posted {request.timePosted}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{request.contact}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t">
                      <p className="font-medium mb-1">Required: {request.requiredUnits} units</p>
                      <p className="text-muted-foreground">{request.details}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-red-600 hover:bg-red-700">I Can Donate</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="create" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Urgent Blood Request</CardTitle>
              <CardDescription>
                Fill out this form to create an urgent blood donation request. This will be displayed to potential
                donors.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hospital">Hospital/Medical Facility</Label>
                  <Input id="hospital" placeholder="Enter hospital name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" placeholder="Enter contact number" type="tel" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type Needed</Label>
                  <Select>
                    <SelectTrigger id="bloodType">
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a-positive">A+</SelectItem>
                      <SelectItem value="a-negative">A-</SelectItem>
                      <SelectItem value="b-positive">B+</SelectItem>
                      <SelectItem value="b-negative">B-</SelectItem>
                      <SelectItem value="ab-positive">AB+</SelectItem>
                      <SelectItem value="ab-negative">AB-</SelectItem>
                      <SelectItem value="o-positive">O+</SelectItem>
                      <SelectItem value="o-negative">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="units">Units Required</Label>
                  <Input id="units" placeholder="Number of units" type="number" min="1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Full address of the medical facility" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Request Details</Label>
                <Textarea
                  id="details"
                  placeholder="Provide details about the emergency situation and why blood is needed urgently"
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-red-600 hover:bg-red-700">Submit Urgent Request</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
