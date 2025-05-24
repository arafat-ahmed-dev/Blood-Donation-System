import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Phone } from "lucide-react"
import ClientLayout from "@/components/layout/clientLayout"
export default function DonationCenterPage() {
  const donationCenters = [
    {
      id: 1,
      name: "City General Hospital Blood Center",
      address: "123 Medical Drive, Cityville, State 12345",
      phone: "(555) 123-4567",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
      status: "Open Now",
      waitTime: "15 min",
      appointments: true,
      walkIns: true,
      distance: "1.2 miles",
    },
    {
      id: 2,
      name: "Downtown Blood Donation Clinic",
      address: "456 Central Avenue, Cityville, State 12345",
      phone: "(555) 987-6543",
      hours: "Mon-Sat: 9AM-7PM",
      status: "Open Now",
      waitTime: "30 min",
      appointments: true,
      walkIns: true,
      distance: "2.5 miles",
    },
    {
      id: 3,
      name: "Westside Medical Center",
      address: "789 Westview Blvd, Cityville, State 12345",
      phone: "(555) 456-7890",
      hours: "Mon-Fri: 7AM-8PM, Sat-Sun: 8AM-4PM",
      status: "Open Now",
      waitTime: "5 min",
      appointments: true,
      walkIns: true,
      distance: "3.8 miles",
    },
    {
      id: 4,
      name: "University Hospital Blood Bank",
      address: "101 University Way, Collegetown, State 12346",
      phone: "(555) 234-5678",
      hours: "Mon-Fri: 8AM-5PM",
      status: "Closed",
      waitTime: "N/A",
      appointments: true,
      walkIns: false,
      distance: "5.2 miles",
    },
    {
      id: 5,
      name: "Eastside Community Clinic",
      address: "202 East Main Street, Eastville, State 12347",
      phone: "(555) 876-5432",
      hours: "Tue-Sat: 10AM-6PM",
      status: "Open Now",
      waitTime: "45 min",
      appointments: true,
      walkIns: true,
      distance: "6.7 miles",
    },
    {
      id: 6,
      name: "Mobile Donation Unit #3",
      address: "Currently at: Cityville Mall, 303 Shopping Lane",
      phone: "(555) 345-6789",
      hours: "Today Only: 11AM-7PM",
      status: "Open Now",
      waitTime: "10 min",
      appointments: false,
      walkIns: true,
      distance: "4.3 miles",
    },
  ]

  const upcomingDrives = [
    {
      id: 1,
      name: "Community Center Blood Drive",
      location: "Cityville Community Center",
      address: "505 Community Lane, Cityville",
      date: "May 5, 2024",
      time: "10:00 AM - 4:00 PM",
    },
    {
      id: 2,
      name: "Tech Company Corporate Drive",
      location: "TechCorp Headquarters",
      address: "123 Innovation Way, Techville",
      date: "May 10, 2024",
      time: "9:00 AM - 3:00 PM",
    },
    {
      id: 3,
      name: "University Spring Blood Drive",
      location: "Student Union Building",
      address: "University Campus, Collegetown",
      date: "May 15-16, 2024",
      time: "11:00 AM - 7:00 PM",
    },
    {
      id: 4,
      name: "Faith Community Drive",
      location: "First Community Church",
      address: "789 Faith Street, Cityville",
      date: "May 20, 2024",
      time: "12:00 PM - 6:00 PM",
    },
  ]

  return (
    <ClientLayout>
      <div className="container py-8">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">Donation Centers</h1>
        <p className="text-muted-foreground">Find blood donation centers near you and schedule your next donation</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Find a Donation Center</CardTitle>
            <CardDescription>Search for donation centers by location or zip code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Enter your location or zip code" />
              </div>
              <div className="w-full md:w-[180px]">
                <Select defaultValue="5">
                  <SelectTrigger>
                    <SelectValue placeholder="Distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Within 5 miles</SelectItem>
                    <SelectItem value="10">Within 10 miles</SelectItem>
                    <SelectItem value="25">Within 25 miles</SelectItem>
                    <SelectItem value="50">Within 50 miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">Search</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Schedule Appointment</CardTitle>
            <CardDescription>Book your next donation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select donation center" />
                </SelectTrigger>
                <SelectContent>
                  {donationCenters.map((center) => (
                    <SelectItem key={center.id} value={center.id.toString()}>
                      {center.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Input type="date" />
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700">Check Availability</Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="centers" className="mb-8">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="centers">Donation Centers</TabsTrigger>
          <TabsTrigger value="drives">Upcoming Drives</TabsTrigger>
        </TabsList>
        <TabsContent value="centers" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {donationCenters.map((center) => (
              <Card key={center.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{center.name}</CardTitle>
                    <Badge
                      variant={center.status === "Open Now" ? "default" : "outline"}
                      className={center.status === "Open Now" ? "bg-green-600" : ""}
                    >
                      {center.status}
                    </Badge>
                  </div>
                  <CardDescription>{center.distance} away</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{center.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{center.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{center.hours}</span>
                    </div>
                    {center.status === "Open Now" && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span>Current wait time: </span>
                        <span className="font-medium">{center.waitTime}</span>
                      </div>
                    )}
                    <div className="flex gap-4 pt-1">
                      {center.appointments && (
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">Appointments</span>
                      )}
                      {center.walkIns && <span className="text-xs bg-muted px-2 py-1 rounded-full">Walk-ins</span>}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1">
                      Directions
                    </Button>
                    <Button
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      disabled={!center.appointments || center.status !== "Open Now"}
                    >
                      {center.appointments ? "Book Now" : "No Booking"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="drives" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingDrives.map((drive) => (
              <Card key={drive.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{drive.name}</CardTitle>
                  <CardDescription>{drive.location}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{drive.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{drive.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{drive.time}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1">
                      Add to Calendar
                    </Button>
                    <Button className="flex-1 bg-red-600 hover:bg-red-700">Register</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </ClientLayout>
  )
}
