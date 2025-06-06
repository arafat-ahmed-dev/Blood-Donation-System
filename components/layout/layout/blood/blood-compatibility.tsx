"use client"

import { useState } from "react"
import { Info, Check, X } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define a type for blood group
type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

// Define the compatibility structure
type CompatibilityInfo = {
  canDonateTo: BloodGroup[];
  canReceiveFrom: BloodGroup[];
};

// Blood compatibility chart
const BLOOD_COMPATIBILITY: Record<BloodGroup, CompatibilityInfo> = {
  "A+": {
    canDonateTo: ["A+", "AB+"],
    canReceiveFrom: ["A+", "A-", "O+", "O-"]
  },
  "A-": {
    canDonateTo: ["A+", "A-", "AB+", "AB-"],
    canReceiveFrom: ["A-", "O-"]
  },
  "B+": {
    canDonateTo: ["B+", "AB+"],
    canReceiveFrom: ["B+", "B-", "O+", "O-"]
  },
  "B-": {
    canDonateTo: ["B+", "B-", "AB+", "AB-"],
    canReceiveFrom: ["B-", "O-"]
  },
  "AB+": {
    canDonateTo: ["AB+"],
    canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  },
  "AB-": {
    canDonateTo: ["AB+", "AB-"],
    canReceiveFrom: ["A-", "B-", "AB-", "O-"]
  },
  "O+": {
    canDonateTo: ["A+", "B+", "AB+", "O+"],
    canReceiveFrom: ["O+", "O-"]
  },
  "O-": {
    canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    canReceiveFrom: ["O-"]
  }
}

const BLOOD_GROUPS: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export function BloodCompatibility() {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<BloodGroup>("A+")

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Blood Group Compatibility</h2>
            <p className="text-lg text-muted-foreground">
              Find out which blood groups are compatible with yours
            </p>
          </div>

          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center justify-between">
                <span>Select Your Blood Group</span>
                <div className="flex items-center text-sm font-normal text-muted-foreground">
                  <Info className="h-4 w-4 mr-1" />
                  Blood compatibility matters for transfusions
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-6">
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {BLOOD_GROUPS.map(group => (
                    <button
                      key={group}
                      className={`h-12 rounded-md font-bold transition-colors ${
                        selectedBloodGroup === group
                          ? "bg-primary text-white"
                          : "bg-primary/10 text-primary hover:bg-primary/20"
                      }`}
                      onClick={() => setSelectedBloodGroup(group)}
                    >
                      {group}
                    </button>
                  ))}
                </div>

                <Tabs defaultValue="donate" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="donate">Can Donate To</TabsTrigger>
                    <TabsTrigger value="receive">Can Receive From</TabsTrigger>
                  </TabsList>

                  <TabsContent value="donate" className="pt-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {BLOOD_GROUPS.map(group => {
                        const canDonate = BLOOD_COMPATIBILITY[selectedBloodGroup].canDonateTo.includes(group)

                        return (
                          <Card key={group} className={`border ${canDonate ? "border-green-200" : "border-red-200"}`}>
                            <CardContent className="p-4 flex items-center gap-3">
                              {canDonate ? (
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                  <Check className="h-5 w-5" />
                                </div>
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                  <X className="h-5 w-5" />
                                </div>
                              )}
                              <span className="font-bold text-lg">{group}</span>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">{selectedBloodGroup}</span> blood can be donated to {BLOOD_COMPATIBILITY[selectedBloodGroup].canDonateTo.length} blood groups
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="receive" className="pt-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {BLOOD_GROUPS.map(group => {
                        const canReceive = BLOOD_COMPATIBILITY[selectedBloodGroup].canReceiveFrom.includes(group)

                        return (
                          <Card key={group} className={`border ${canReceive ? "border-green-200" : "border-red-200"}`}>
                            <CardContent className="p-4 flex items-center gap-3">
                              {canReceive ? (
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                  <Check className="h-5 w-5" />
                                </div>
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                  <X className="h-5 w-5" />
                                </div>
                              )}
                              <span className="font-bold text-lg">{group}</span>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">{selectedBloodGroup}</span> blood can receive from {BLOOD_COMPATIBILITY[selectedBloodGroup].canReceiveFrom.length} blood groups
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
