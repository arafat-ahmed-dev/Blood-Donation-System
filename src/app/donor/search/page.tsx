"use client";

import { useState } from "react"
import { Search, Filter, MapPin, Clock, User, Droplet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// Sample donor data
const DONORS = [
  {
    id: 1,
    name: "Mohammad Ali",
    bloodGroup: "A+",
    location: "Mirpur, Dhaka",
    lastDonation: "3 months ago",
    donationCount: 5,
    available: true
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    bloodGroup: "B+",
    location: "Uttara, Dhaka",
    lastDonation: "5 months ago",
    donationCount: 3,
    available: true
  },
  {
    id: 3,
    name: "Rahman Khan",
    bloodGroup: "O-",
    location: "Dhanmondi, Dhaka",
    lastDonation: "4 months ago",
    donationCount: 7,
    available: true
  },
  {
    id: 4,
    name: "Fatima Ahmed",
    bloodGroup: "AB+",
    location: "Gulshan, Dhaka",
    lastDonation: "7 months ago",
    donationCount: 2,
    available: true
  },
  {
    id: 5,
    name: "Kamal Uddin",
    bloodGroup: "B-",
    location: "Mohammadpur, Dhaka",
    lastDonation: "2 months ago",
    donationCount: 6,
    available: false
  },
  {
    id: 6,
    name: "Sabina Yasmin",
    bloodGroup: "A-",
    location: "Motijheel, Dhaka",
    lastDonation: "8 months ago",
    donationCount: 4,
    available: true
  },
  {
    id: 7,
    name: "Jahangir Alam",
    bloodGroup: "O+",
    location: "Badda, Dhaka",
    lastDonation: "1 month ago",
    donationCount: 9,
    available: true
  },
  {
    id: 8,
    name: "Nasreen Begum",
    bloodGroup: "AB-",
    location: "Khilgaon, Dhaka",
    lastDonation: "6 months ago",
    donationCount: 3,
    available: true
  },
  {
    id: 9,
    name: "Rahim Miah",
    bloodGroup: "A+",
    location: "Banani, Dhaka",
    lastDonation: "10 months ago",
    donationCount: 1,
    available: true
  },
  {
    id: 10,
    name: "Taslima Khatun",
    bloodGroup: "B+",
    location: "Chittagong",
    lastDonation: "5 months ago",
    donationCount: 5,
    available: true
  },
  {
    id: 11,
    name: "Imran Hossain",
    bloodGroup: "O+",
    location: "Sylhet",
    lastDonation: "4 months ago",
    donationCount: 4,
    available: true
  },
  {
    id: 12,
    name: "Roksana Akter",
    bloodGroup: "A-",
    location: "Rajshahi",
    lastDonation: "7 months ago",
    donationCount: 2,
    available: true
  }
]

// Areas/divisions in Bangladesh
const AREAS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Rangpur",
  "Mymensingh"
]

// Blood groups
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export default function DonorSearchPage() {
  const [filters, setFilters] = useState({
    bloodGroup: "any",
    location: "any",
    availability: "any",
  });

  const filteredDonors = DONORS.filter(donor => {
    const matchesBloodGroup =
      filters.bloodGroup === "any" || donor.bloodGroup === filters.bloodGroup;
    const matchesLocation =
      filters.location === "any" || donor.location === filters.location;
    const matchesAvailability =
      filters.availability === "any" ||
      (filters.availability === "available" && donor.available) ||
      (filters.availability === "unavailable" && !donor.available);

    return matchesBloodGroup && matchesLocation && matchesAvailability;
  });

  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold mb-4">Find Blood Donors</h1>
            <p className="text-lg text-muted-foreground">
              Search for potential blood donors based on blood group, location, and availability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Search filters sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Filter className="h-5 w-5" />
                    Search Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Filters */}
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select
                      onValueChange={value =>
                        setFilters(prev => ({ ...prev, bloodGroup: value }))
                      }
                    >
                      <SelectTrigger id="bloodGroup">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        {BLOOD_GROUPS.map(group => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select
                      onValueChange={value =>
                        setFilters(prev => ({ ...prev, location: value }))
                      }
                    >
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select area/city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        {AREAS.map(area => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select
                      onValueChange={value =>
                        setFilters(prev => ({ ...prev, availability: value }))
                      }
                    >
                      <SelectTrigger id="availability">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="available">Available Now</SelectItem>
                        <SelectItem value="unavailable">Not Available</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full" onClick={() => console.log(filters)}>
                    Apply Filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Donors grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDonors.map(donor => (
                  <DonorCard key={donor.id} donor={donor} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

interface DonorCardProps {
  donor: typeof DONORS[0]
}

function DonorCard({ donor }: DonorCardProps) {
  const initials = donor.name.split(' ').map(n => n[0]).join('')

  return (
    <Card className={`hover:shadow-md transition-shadow ${!donor.available ? 'border-muted' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-primary">{initials}</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold">{donor.name}</h3>
              {!donor.available && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">
                  Not Available
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Droplet className="h-3.5 w-3.5" />
              <span className="font-medium text-primary">{donor.bloodGroup}</span>
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{donor.location}</span>
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Last donated: {donor.lastDonation}</span>
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <User className="h-3.5 w-3.5" />
              <span>Donations: {donor.donationCount}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t flex">
          <Button className="w-full" variant={donor.available ? "default" : "outline"} disabled={!donor.available}>
            Contact Donor
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
