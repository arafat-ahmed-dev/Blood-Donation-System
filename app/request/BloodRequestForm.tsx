"use client";
import type { Metadata } from "next";
import Link from "next/link";
import { Info, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BLOOD_GROUPS } from "@/lib/constants";
import { locationList } from "@/lib/data";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Request Blood",
  description: "Request blood donation from voluntary donors in Bangladesh.",
};

export default function RequestBloodPage() {
  const [filterInputs, setFilterInputs] = useState({
    bloodType: "any",
    city: "any",
    upazila: "any",
    unitsNeeded: "any",
  });
  console.log(filterInputs);
  const [availableUpazilas, setAvailableUpazilas] = useState<string[]>([]);
  useEffect(() => {
    if (filterInputs.bloodType !== "any") {
      const bloodTypeData = BLOOD_GROUPS.find(
        (group) => group === filterInputs.bloodType
      );
      if (bloodTypeData) {
        setFilterInputs((prev) => ({ ...prev, bloodType: bloodTypeData }));
      }
    }
    if (filterInputs.city !== "any") {
      const cityData = locationList.find(
        (loc) => loc.city === filterInputs.city
      );
      setAvailableUpazilas(cityData?.upazilas || []);
      if (
        filterInputs.upazila !== "any" &&
        !cityData?.upazilas.includes(filterInputs.upazila)
      ) {
        setFilterInputs((prev) => ({ ...prev, upazila: "any" }));
      }
    } else {
      setAvailableUpazilas([]);
      setFilterInputs((prev) => ({ ...prev, upazila: "any" }));
    }
  }, [filterInputs.city, filterInputs.upazila]);
  return (
    <>
      <main className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                  Request Blood Donation
                </h1>
                <p className="text-muted-foreground">
                  Fill out the form below to request blood donation. Your
                  request will be shared with potential donors in your area.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Patient and Request Information</CardTitle>
                  <CardDescription>
                    Please provide accurate information for better results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">
                        Emergency Request Process
                      </p>
                      <p className="text-muted-foreground">
                        For faster results, after submitting this form, call our
                        hotline at{" "}
                        <span className="font-medium text-foreground">
                          +880 1712-345678
                        </span>{" "}
                        to expedite your request.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Patient Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patientName">Patient Name</Label>
                        <Input id="patientName" placeholder="Full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patientAge">Patient Age</Label>
                        <Input
                          id="patientAge"
                          type="number"
                          placeholder="Age in years"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bloodGroup">Required Blood Group</Label>
                        <Select
                          value={filterInputs.bloodType}
                          onValueChange={(value: string) =>
                            setFilterInputs((prev) => ({
                              ...prev,
                              bloodType: value,
                            }))
                          }
                        >
                          <SelectTrigger id="bloodGroup">
                            <SelectValue placeholder="Select blood group">
                              {filterInputs.bloodType === "any"
                                ? "Any"
                                : filterInputs.bloodType}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {BLOOD_GROUPS.map((group) => (
                              <SelectItem key={group} value={group}>
                                {group}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unitsNeeded">Units Needed</Label>
                        <Select
                          value={filterInputs.unitsNeeded}
                          onValueChange={(value: string) =>
                            setFilterInputs((prev) => ({
                              ...prev,
                              unitsNeeded: value,
                            }))
                          }
                        >
                          <SelectTrigger id="unitsNeeded">
                            <SelectValue placeholder="Select units needed">
                              {filterInputs.unitsNeeded === "any"
                                ? "Any"
                                : filterInputs.unitsNeeded}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Bag</SelectItem>
                            <SelectItem value="2">2 Bags</SelectItem>
                            <SelectItem value="3">3 Bags</SelectItem>
                            <SelectItem value="4">4 Bags</SelectItem>
                            <SelectItem value="5+">5+ Bags</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Hospital Information
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="hospitalName">Hospital Name</Label>
                      <Input
                        id="hospitalName"
                        placeholder="Full hospital name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hospitalAddress">Hospital Address</Label>
                      <Input id="hospitalAddress" placeholder="Full address" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Select
                          value={filterInputs.city}
                          onValueChange={(value: string) =>
                            setFilterInputs((prev) => ({
                              ...prev,
                              city: value,
                            }))
                          }
                        >
                          <SelectTrigger id="city">
                            <SelectValue placeholder="Select city">
                              {filterInputs.city === "any"
                                ? "Any"
                                : filterInputs.city}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            {locationList.map((location) => (
                              <SelectItem
                                key={location.city}
                                value={location.city}
                              >
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
                            setFilterInputs((prev) => ({
                              ...prev,
                              upazila: value,
                            }))
                          }
                          disabled={filterInputs.city === "any"}
                        >
                          <SelectTrigger id="upazila">
                            <SelectValue placeholder="Select upazila">
                              {filterInputs.upazila === "any"
                                ? "Any"
                                : filterInputs.upazila}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            {availableUpazilas.map((upazila) => (
                              <SelectItem key={upazila} value={upazila}>
                                {upazila}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bloodRequiredBy">
                        When is blood needed?
                      </Label>
                      <Input id="bloodRequiredBy" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label>Is this an emergency?</Label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="emergency"
                            value="yes"
                            className="h-4 w-4 text-primary focus:ring-primary"
                          />
                          <span>Yes, urgent</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="emergency"
                            value="no"
                            className="h-4 w-4 text-primary focus:ring-primary"
                          />
                          <span>No, scheduled need</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Person Name</Label>
                        <Input id="contactName" placeholder="Full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="relationship">
                          Relationship to Patient
                        </Label>
                        <Input
                          id="relationship"
                          placeholder="e.g. Family member, Friend"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Contact Phone Number</Label>
                      <div className="flex">
                        <div className="inline-flex h-10 items-center justify-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                          +880
                        </div>
                        <Input
                          id="contactPhone"
                          type="tel"
                          placeholder="1XX XXX XXXX"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="alternatePhone">
                        Alternate Phone (Optional)
                      </Label>
                      <div className="flex">
                        <div className="inline-flex h-10 items-center justify-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                          +880
                        </div>
                        <Input
                          id="alternatePhone"
                          type="tel"
                          placeholder="1XX XXX XXXX"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">
                        Additional Information (Optional)
                      </Label>
                      <textarea
                        id="additionalInfo"
                        rows={3}
                        placeholder="Any additional details that might help donors..."
                        className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="publicInfo"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor="publicInfo"
                      className="text-sm text-muted-foreground"
                    >
                      I understand that this information will be visible to
                      registered donors
                    </label>
                  </div>

                  <Button className="w-full" size="lg">
                    Submit Blood Request
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card className="sticky top-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Blood Group Compatibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Remember that some blood groups are compatible with
                      others. If you're not finding exact matches, you might be
                      able to use compatible blood types.
                    </p>
                    <Link
                      href="/blood-groups"
                      className="text-sm text-primary hover:underline"
                    >
                      View blood group compatibility chart
                    </Link>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Tips for Finding Donors</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex gap-2">
                        <span className="text-primary font-medium">•</span>
                        <span>Submit your request as early as possible</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-medium">•</span>
                        <span>Provide complete and accurate information</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-medium">•</span>
                        <span>Share your request on social media</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-medium">•</span>
                        <span>
                          Consider contacting nearby blood banks as well
                        </span>
                      </li>
                    </ul>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Need Help?</h3>
                    <p className="text-sm text-muted-foreground">
                      If you're facing an emergency or need assistance with your
                      request, call our 24/7 helpline.
                    </p>
                    <div className="bg-primary/10 p-3 rounded-md text-center">
                      <p className="text-sm font-medium">
                        Rokto Shetu Helpline
                      </p>
                      <p className="text-lg font-bold text-primary">
                        +880 1712-345678
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
