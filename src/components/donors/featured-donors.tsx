"use client"

import Image from "next/image"
import { MapPin, Clock, Award, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

// Sample donors data
const FEATURED_DONORS = [
  {
    id: 1,
    name: "Rafiqul Islam",
    bloodGroup: "O+",
    location: "Uttara, Dhaka",
    lastDonation: "3 months ago",
    donationCount: 8,
    image: "/donors/donor-1.jpg"
  },
  {
    id: 2,
    name: "Nasreen Ahmed",
    bloodGroup: "A-",
    location: "Dhanmondi, Dhaka",
    lastDonation: "4 months ago",
    donationCount: 12,
    image: "/donors/donor-2.jpg"
  },
  {
    id: 3,
    name: "Khaled Hossain",
    bloodGroup: "B+",
    location: "Chittagong",
    lastDonation: "6 months ago",
    donationCount: 6,
    image: "/donors/donor-3.jpg"
  },
  {
    id: 4,
    name: "Sabina Yasmin",
    bloodGroup: "AB+",
    location: "Sylhet",
    lastDonation: "5 months ago",
    donationCount: 5,
    image: "/donors/donor-4.jpg"
  }
]

export function FeaturedDonors() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Heroes</h2>
          <p className="text-lg text-muted-foreground">
            These outstanding donors are helping to save lives across Bangladesh
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_DONORS.map(donor => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <a href="/donor/list">View All Donors</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

interface DonorCardProps {
  donor: typeof FEATURED_DONORS[0]
}

function DonorCard({ donor }: DonorCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square relative bg-muted">
        <div className="absolute top-4 right-4 z-10">
          <span className="blood-type">{donor.bloodGroup}</span>
        </div>
        <div className="h-full w-full bg-muted flex items-center justify-center">
          {/* Placeholder for donor photo */}
          <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl">
            {donor.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <h3 className="font-bold text-xl">{donor.name}</h3>
      </CardHeader>

      <CardContent className="pb-4">
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{donor.location}</span>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Last donated: {donor.lastDonation}</span>
          </li>
          <li className="flex items-center gap-2">
            <Award className="h-4 w-4 text-muted-foreground" />
            <span>Donated {donor.donationCount} times</span>
          </li>
        </ul>
      </CardContent>

      <CardFooter className="pt-0">
        <Button className="w-full gap-1">
          <Phone className="h-4 w-4" />
          Contact
        </Button>
      </CardFooter>
    </Card>
  )
}
