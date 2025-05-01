"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { differenceInDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useStore } from "@/lib/store"

const formSchema = z.object({
  age: z.string().refine(
    (val) => {
      const age = Number.parseInt(val, 10)
      return !isNaN(age) && age >= 16 && age <= 120
    },
    { message: "You must be at least 16 years old to donate blood" },
  ),
  weight: z.string().refine(
    (val) => {
      const weight = Number.parseInt(val, 10)
      return !isNaN(weight) && weight >= 110
    },
    { message: "You must weigh at least 110 pounds to donate blood" },
  ),
  lastDonation: z.string().optional(),
  feeling: z.enum(["yes", "no"], {
    required_error: "Please select if you're feeling well today",
  }),
  medication: z.enum(["yes", "no"], {
    required_error: "Please select if you're taking any medication",
  }),
  recentIllness: z.enum(["yes", "no"], {
    required_error: "Please select if you've had any recent illness",
  }),
  recentSurgery: z.enum(["yes", "no"], {
    required_error: "Please select if you've had any recent surgery",
  }),
  pregnancy: z.enum(["yes", "no", "na"], {
    required_error: "Please select if you're pregnant or have been recently",
  }),
  bloodType: z.string().optional(),
})

export function EligibilityChecker() {
  const [result, setResult] = useState<{
    eligible: boolean
    message: string
    nextEligibleDate?: string
  } | null>(null)

  const { user } = useAuth()
  const { bloodInventory } = useStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: user ? (new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()).toString() : "",
      weight: "",
      lastDonation: user?.lastDonation || "",
      feeling: "yes",
      medication: "no",
      recentIllness: "no",
      recentSurgery: "no",
      pregnancy: "na",
      bloodType: user?.bloodType || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Check eligibility based on form values
    let eligible = true
    let message = "You are eligible to donate blood!"
    let nextEligibleDate: string | undefined = undefined

    // Check age
    const age = Number.parseInt(values.age, 10)
    if (age < 17) {
      eligible = false
      message = "You must be at least 17 years old to donate blood."
    }

    // Check weight
    const weight = Number.parseInt(values.weight, 10)
    if (weight < 110) {
      eligible = false
      message = "You must weigh at least 110 pounds to donate blood."
    }

    // Check last donation
    if (values.lastDonation) {
      const lastDonationDate = new Date(values.lastDonation)
      const today = new Date()
      const daysSinceLastDonation = differenceInDays(today, lastDonationDate)

      if (daysSinceLastDonation < 56) {
        eligible = false
        const nextDate = new Date(lastDonationDate)
        nextDate.setDate(nextDate.getDate() + 56)
        nextEligibleDate = nextDate.toISOString().split("T")[0]
        message = `You must wait at least 56 days between whole blood donations. You will be eligible to donate on ${nextEligibleDate}.`
      }
    }

    // Check feeling well
    if (values.feeling === "no") {
      eligible = false
      message = "You should be feeling well on the day of donation."
    }

    // Check medication
    if (values.medication === "yes") {
      eligible = false
      message = "Some medications may affect your eligibility. Please consult with a donation center staff member."
    }

    // Check recent illness
    if (values.recentIllness === "yes") {
      eligible = false
      message = "You should be fully recovered from any illness before donating blood."
    }

    // Check recent surgery
    if (values.recentSurgery === "yes") {
      eligible = false
      message = "You should wait at least 6 months after surgery before donating blood."
    }

    // Check pregnancy
    if (values.pregnancy === "yes") {
      eligible = false
      message = "You should wait at least 6 weeks after pregnancy before donating blood."
    }

    // Check if blood type is in critical need
    if (eligible && values.bloodType) {
      const bloodTypeInfo = bloodInventory.find((b) => b.type === values.bloodType)
      if (bloodTypeInfo && bloodTypeInfo.status === "Critical") {
        message = `You are eligible to donate blood! Your blood type (${values.bloodType}) is currently in critical need.`
      }
    }

    setResult({ eligible, message, nextEligibleDate })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blood Donation Eligibility Checker</CardTitle>
        <CardDescription>Answer a few questions to check if you're eligible to donate blood</CardDescription>
      </CardHeader>
      <CardContent>
        {result ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {result.eligible ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
              <div>
                <h3 className={`text-lg font-medium ${result.eligible ? "text-green-600" : "text-red-600"}`}>
                  {result.eligible ? "Eligible" : "Not Eligible"}
                </h3>
                <p className="text-muted-foreground">{result.message}</p>
                {result.nextEligibleDate && (
                  <p className="text-sm mt-2">
                    Next eligible date: <span className="font-medium">{result.nextEligibleDate}</span>
                  </p>
                )}
              </div>
            </div>
            <Button onClick={() => setResult(null)} variant="outline" className="w-full">
              Check Again
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter your age" {...field} />
                      </FormControl>
                      <FormDescription>You must be at least 17 years old to donate blood</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (lbs)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter your weight" {...field} />
                      </FormControl>
                      <FormDescription>You must weigh at least 110 pounds to donate blood</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="lastDonation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Last Donation (if applicable)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>You must wait at least 56 days between whole blood donations</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bloodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Type (if known)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your blood type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="feeling"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you feeling well today?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="medication"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you currently taking any medication?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recentIllness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Have you had any illness in the past 14 days?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recentSurgery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Have you had surgery in the past 6 months?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pregnancy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you pregnant or have you given birth in the past 6 weeks?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="na" />
                          </FormControl>
                          <FormLabel className="font-normal">Not Applicable</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Check Eligibility
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Note: This eligibility checker provides general guidance only. Final eligibility determination will be made by
        medical staff at the donation center.
      </CardFooter>
    </Card>
  )
}
