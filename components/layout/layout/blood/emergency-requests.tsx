"use client"

import { useState } from "react"
import { BellRing, MapPin, Phone, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Sample emergency requests data
const EMERGENCY_REQUESTS = [
  {
    id: 1,
    patientName: "Ahsan Rahman",
    bloodGroup: "A+",
    location: "Dhaka Medical College Hospital",
    phone: "+880 1712-345678",
    date: "Today",
    isEmergency: true
  },
  {
    id: 2,
    patientName: "Fatima Begum",
    bloodGroup: "O-",
    location: "Square Hospital, Panthapath",
    phone: "+880 1987-654321",
    date: "Today",
    isEmergency: true
  },
  {
    id: 3,
    patientName: "Mohammed Karim",
    bloodGroup: "B+",
    location: "Bangabandhu Sheikh Mujib Medical University",
    phone: "+880 1534-789012",
    date: "Tomorrow",
    isEmergency: false
  },
  {
    id: 4,
    patientName: "Nusrat Islam",
    bloodGroup: "AB+",
    location: "United Hospital, Gulshan",
    phone: "+880 1645-902178",
    date: "Apr 13, 2025",
    isEmergency: false
  }
]

export function EmergencyRequests() {
  const [showAll, setShowAll] = useState(false)

  const displayRequests = showAll
    ? EMERGENCY_REQUESTS
    : EMERGENCY_REQUESTS.filter(req => req.isEmergency)

  return (
    <section className="py-16 donor-section">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold">Emergency Requests</h2>
            <p className="text-muted-foreground">People who need blood urgently</p>
          </div>
          <Button
            variant={showAll ? "default" : "outline"}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Emergency Only" : "View All Requests"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayRequests.map(request => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface RequestCardProps {
  request: typeof EMERGENCY_REQUESTS[0]
}

function RequestCard({ request }: RequestCardProps) {
  return (
    <Card className={request.isEmergency ? "border-red-200 shadow-sm" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center gap-2">
            <span className="blood-type">{request.bloodGroup}</span>
            <span>{request.patientName}</span>
          </CardTitle>
          {request.isEmergency && (
            <span className="emergency-badge flex items-center gap-1">
              <BellRing className="h-3 w-3" />
              Urgent
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{request.location}</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{request.phone}</span>
          </li>
          <li className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{request.date}</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="pt-0 flex gap-2">
        <Button variant="outline" className="w-1/2" size="sm">
          <Phone className="h-3 w-3 mr-1" />
          Call
        </Button>
        <Button className="w-1/2" size="sm">Contact</Button>
      </CardFooter>
    </Card>
  )
}
