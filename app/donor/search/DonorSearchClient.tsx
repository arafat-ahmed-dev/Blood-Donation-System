"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BLOOD_TYPES, locationList } from "@/lib/constants"
import { Clock, Droplet, Filter, MapPin, User } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface Location {
  address: string
  city: string
  upazila: string
}

interface Donor {
  id: string
  name: string
  bloodType: string
  location: Location
  nextEligibleDate: string
  donationCount: number
  available: boolean
}

export default function DonorSearchClient({ donors }: { donors: Donor[] }) {
  const [filterInputs, setFilterInputs] = useState({
    bloodType: "any",
    city: "any",
    upazila: "any",
    availability: "any",
  });

  const [availableUpazilas, setAvailableUpazilas] = useState<string[]>([]);

  console.log(donors);

  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const bloodType = searchParams.get("bloodType") || "any";
    const upazila = searchParams.get("upazila") || "any";
    const city = searchParams.get("city") || "any";
    const availability = searchParams.get("availability") || "any";

    setFilterInputs({ bloodType, upazila, city, availability });

    if (city !== "any") {
      const cityData = locationList.find(loc => loc.city === city);
      setAvailableUpazilas(cityData?.upazilas || []);
    } else {
      setAvailableUpazilas([]);
    }
  }, [searchParams]);

  useEffect(() => {
    if (filterInputs.city !== "any") {
      const cityData = locationList.find(loc => loc.city === filterInputs.city);
      setAvailableUpazilas(cityData?.upazilas || []);
      if (filterInputs.upazila !== "any" && !cityData?.upazilas.includes(filterInputs.upazila)) {
        setFilterInputs(prev => ({ ...prev, upazila: "any" }));
      }
    } else {
      setAvailableUpazilas([]);
      setFilterInputs(prev => ({ ...prev, upazila: "any" }));
    }
  }, [filterInputs.city, filterInputs.upazila]);

  const handleApplyFilters = () => {
    setIsLoading(true);

    const params = new URLSearchParams();

    const currentPage = searchParams.get("page");
    if (currentPage && filterInputs.bloodType === "any" &&
      filterInputs.city === "any" &&
      filterInputs.upazila === "any" &&
      filterInputs.availability === "any") {
      params.set("page", currentPage);
    }

    if (filterInputs.bloodType !== "any") {
      const formattedBlood = filterInputs.bloodType;
      params.set("bloodType", formattedBlood?.toString() || filterInputs.bloodType);
    }

    if (filterInputs.city !== "any") {
      params.set("city", filterInputs.city);
    }
    if (filterInputs.upazila !== "any") {
      params.set("upazila", filterInputs.upazila);
    }

    if (filterInputs.availability !== "any") {
      params.set("availability", filterInputs.availability);
    }

    if (filterInputs.bloodType !== "any" ||
      filterInputs.city !== "any" ||
      filterInputs.upazila !== "any" ||
      filterInputs.availability !== "any") {
      params.set("page", "1");
    }

    const queryString = params.toString();
    const url = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    router.push(url);
    setIsLoading(false);
  };
  return (
    <div className="space-y-8">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Filter className="h-5 w-5" />
              Search Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="bloodType">Blood Group</Label>
                <Select
                  value={filterInputs.bloodType}
                  onValueChange={(value: string) =>
                    setFilterInputs(prev => ({ ...prev, bloodType: value }))
                  }
                >
                  <SelectTrigger id="bloodType">
                    <SelectValue placeholder="Select blood group">
                      {filterInputs.bloodType === "any" ? "Any" : filterInputs.bloodType}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    {BLOOD_TYPES.map(group => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="city">City</Label>
                <Select
                  value={filterInputs.city}
                  onValueChange={(value: string) =>
                    setFilterInputs(prev => ({ ...prev, city: value }))
                  }
                >
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select city">
                      {filterInputs.city === "any" ? "Any" : filterInputs.city}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    {locationList.map(location => (
                      <SelectItem key={location.city} value={location.city}>
                        {location.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="upazila">Upazila</Label>
                <Select
                  value={filterInputs.upazila}
                  onValueChange={(value: string) =>
                    setFilterInputs(prev => ({ ...prev, upazila: value }))
                  }
                  disabled={filterInputs.city === "any"}
                >
                  <SelectTrigger id="upazila">
                    <SelectValue placeholder="Select upazila">
                      {filterInputs.upazila === "any" ? "Any" : filterInputs.upazila}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    {availableUpazilas.map(upazila => (
                      <SelectItem key={upazila} value={upazila}>
                        {upazila}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-none">
                <Button
                  onClick={handleApplyFilters}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Apply Filters"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {donors.map((donor) => {
          const initials = donor.name.split(' ').map(n => n[0]).join('');
          return (
            <Card key={donor.id} className={`hover:shadow-md transition-shadow ${!donor.available ? 'border-muted' : ''}`}>
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
                    <span className="font-medium text-primary">{donor.bloodType}</span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{donor.location.address}, {donor.location.upazila}, {donor.location.city}</span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <p>
                      Eligible : <span className={donor.available ? "text-green-600" : "text-red-600"}>
                          {donor.available ? "Available now" : donor.nextEligibleDate}
                      </span>
                    </p>
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
        })}
      </div>
    </div>
  )
}
