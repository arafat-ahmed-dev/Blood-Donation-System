"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Clock, User, Droplet, MapPin } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { AREAS as area, BLOOD_GROUPS as bloodGroups } from "@/lib/constants";
import { formatBloodGroup, getBloodGroupKey } from "@/lib/utils";
import { locationList } from "@/lib/data";


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
    // State to track filter inputs
    const [filterInputs, setFilterInputs] = useState({
        bloodGroup: "any",
        city: "any",
        upazila: "any",
        availability: "any",
    });
    
    // Add state for available upazilas
    const [availableUpazilas, setAvailableUpazilas] = useState<string[]>([]);
    
    console.log(filterInputs);

    // State to track if we're loading new data
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    // Initialize filters from URL on component mount and when URL changes
    useEffect(() => {
        // Always default to "any" if the parameter doesn't exist
        const bloodGroup = formatBloodGroup(searchParams.get("bloodGroup") || "any") || "any";
        const upazila = searchParams.get("upazila") || "any";
        const city = searchParams.get("city") || "any";
        const availability = searchParams.get("availability") || "any";

        setFilterInputs({ bloodGroup, upazila, city, availability });

        // Update available upazilas when city changes
        if (city !== "any") {
            const cityData = locationList.find(loc => loc.city === city);
            setAvailableUpazilas(cityData?.upazilas || []);
        } else {
            setAvailableUpazilas([]);
        }
    }, [searchParams]);

    // Update available upazilas when city changes
    useEffect(() => {
        if (filterInputs.city !== "any") {
            const cityData = locationList.find(loc => loc.city === filterInputs.city);
            setAvailableUpazilas(cityData?.upazilas || []);
            // Reset upazila selection when city changes
            if (filterInputs.upazila !== "any" && !cityData?.upazilas.includes(filterInputs.upazila)) {
                setFilterInputs(prev => ({ ...prev, upazila: "any" }));
            }
        } else {
            setAvailableUpazilas([]);
            setFilterInputs(prev => ({ ...prev, upazila: "any" }));
        }
    }, [filterInputs.city, filterInputs.upazila]);

    // Handle filter button click
    const handleApplyFilters = () => {
        setIsLoading(true);

        // Start with a new URLSearchParams object
        const params = new URLSearchParams();

        // Only keep page parameter if it exists and we're wiping all filters
        const currentPage = searchParams.get("page");
        if (currentPage && filterInputs.bloodGroup === "any" &&
            filterInputs.city === "any" &&
            filterInputs.upazila === "any" &&
            filterInputs.availability === "any") {
            params.set("page", currentPage);
        }

        // Only add parameters for non-"any" filters
        if (filterInputs.bloodGroup !== "any") {
            const formattedBlood = getBloodGroupKey(filterInputs.bloodGroup);
            params.set("bloodGroup", formattedBlood?.toString() || filterInputs.bloodGroup);
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

        // Reset to page 1 if any filters are applied
        if (filterInputs.bloodGroup !== "any" ||
            filterInputs.city !== "any" ||
            filterInputs.upazila !== "any" ||
            filterInputs.availability !== "any") {
            params.set("page", "1");
        }

        // Build the URL - use just pathname if no parameters
        const queryString = params.toString();
        const url = queryString
            ? `${window.location.pathname}?${queryString}`
            : window.location.pathname;

        // Navigate to the new URL
        router.push(url);
        setIsLoading(false);
    };

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
                                value={filterInputs.bloodGroup}
                                onValueChange={(value: string) =>
                                    setFilterInputs(prev => ({ ...prev, bloodGroup: value }))
                                }
                            >
                                <SelectTrigger id="bloodGroup">
                                    <SelectValue placeholder="Select blood group">
                                        {filterInputs.bloodGroup === "any" ? "Any" : filterInputs.bloodGroup}
                                    </SelectValue>
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

                        <div className="space-y-2">
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

                        {/* <div className="space-y-2">
                            <Label htmlFor="availability">Availability</Label>
                            <Select
                                value={filterInputs.availability}
                                onValueChange={(value: string) =>
                                    setFilterInputs(prev => ({ ...prev, availability: value }))
                                }
                            >
                                <SelectTrigger id="availability">
                                    <SelectValue placeholder="Select availability">
                                        {filterInputs.availability === "any" ? "Any" :
                                            filterInputs.availability === "available" ? "Available Now" : "Not Available"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">Any</SelectItem>
                                    <SelectItem value="available">Available Now</SelectItem>
                                    <SelectItem value="unavailable">Not Available</SelectItem>
                                </SelectContent>
                            </Select>
                        </div> */}

                        <Button
                            className="w-full"
                            onClick={handleApplyFilters}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Apply Filters"}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Donors grid */}
            <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {donors.length > 0 ? (
                        donors.map((donor, index) => (
                            <DonorCard key={donor.id || `donor-${index}`} donor={donor} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p className="text-muted-foreground">No donors found matching your criteria.</p>
                        </div>
                    )}
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
                            <span>{donor.location.address}, {donor.location.upazila}, {donor.location.city}</span>
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