"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Clock, User, Droplet, MapPin } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { AREAS as areas, BLOOD_GROUPS as bloodGroups } from "@/lib/constants";

interface Donor {
    id: number;
    name: string;
    bloodGroup: string;
    location: Location;
    lastDonation: string;
    donationCount: number;
    available: boolean;
}

interface DonorSearchClientProps {
    donors: Donor[];
}

export default function DonorSearchClient({ donors }: DonorSearchClientProps) {
    const [filters, setFilters] = useState({
        bloodGroup: "any",
        location: "any",
        availability: "any",
    });

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const bloodGroup = searchParams.get("bloodGroup") || "any";
        const location = searchParams.get("location") || "any";
        const availability = searchParams.get("availability") || "any";

        setFilters({ bloodGroup, location, availability });
    }, [searchParams]);

    const applyFilters = () => {
        const params = new URLSearchParams(window.location.search);

        if (filters.bloodGroup !== "any") {
            params.set("bloodGroup", filters.bloodGroup);
        }
        if (filters.location !== "any") {
            params.set("location", filters.location);
        }
        if (filters.availability !== "any") {
            params.set("availability", filters.availability);
        }

        router.push(`/search?${params.toString()}`);
    };


    const filteredDonors = donors.filter(donor => {
        const matchesBloodGroup =
            filters.bloodGroup === "any" || donor.bloodGroup === filters.bloodGroup;
        const matchesLocation =
            filters.location === "any" || donor.location.state === filters.location;
        const matchesAvailability =
            filters.availability === "any" ||
            (filters.availability === "available" && donor.available) ||
            (filters.availability === "unavailable" && !donor.available);

        return matchesBloodGroup && matchesLocation && matchesAvailability;
    }).sort((a, b) => Number(b.available) - Number(a.available));

    return (
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
                                value={filters.bloodGroup}
                                onValueChange={(value: string) =>
                                    setFilters(prev => ({ ...prev, bloodGroup: value }))
                                }
                            >
                                <SelectTrigger id="bloodGroup">
                                    <SelectValue placeholder="Select blood group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">Any</SelectItem>
                                    {bloodGroups.map(group => (
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
                                value={filters.location}
                                onValueChange={(value: string) =>
                                    setFilters(prev => ({ ...prev, location: value }))
                                }
                            >
                                <SelectTrigger id="location">
                                    <SelectValue placeholder="Select area/city" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">Any</SelectItem>
                                    {areas.map(area => (
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
                                value={filters.availability}
                                onValueChange={(value: string) =>
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

                        <Button className="w-full" onClick={applyFilters}>
                            Apply Filters
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Donors grid */}
            <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDonors.map((donor, index) => (
                        <DonorCard key={donor.id || `donor-${index}`} donor={donor} />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface DonorCardProps {
    donor: Donor;
}

function DonorCard({ donor }: DonorCardProps) {
    const initials = donor.name.split(' ').map(n => n[0]).join('');

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
                            <span>{donor.location.address}, {donor.location.state}, {donor.location.city}</span>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <p>
                                Last donated: <span className={donor.available ? "text-green-600" : "text-red-600"}>
                                    {donor.lastDonation}
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
    );
}
