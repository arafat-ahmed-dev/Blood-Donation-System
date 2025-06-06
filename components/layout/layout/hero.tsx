"use client"

import Link from "next/link"
import { Search, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export function Hero() {

  return (
    <section className="relative bg-gradient-to-r from-red-600 to-red-700 py-20 md:py-32">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-5 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Donate Blood <br />
              Save Lives
            </h1>
            <p className="text-lg md:text-xl max-w-lg opacity-90">
              Rokto Shetu is a free platform connecting blood donors with those in need across Bangladesh.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" asChild>
                <Link href="/donor/register" className="gap-2">
                  <Heart className="h-5 w-5" />
                  Become a Donor
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Link href="/request">Request Blood</Link>
              </Button>
            </div>
          </div>

          <div className="backdrop-blur-sm bg-white/20 rounded-xl p-1">
            <Card className="border-none shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle>Find a Blood Donor</CardTitle>
                <CardDescription>
                  Search for voluntary donors near you
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="location" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="location">By Location</TabsTrigger>
                    <TabsTrigger value="phone">By Phone Number</TabsTrigger>
                  </TabsList>

                  <TabsContent value="location" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="location" className="text-sm font-medium">
                          Your Location
                        </label>
                        <Input
                          id="location"
                          placeholder="Enter your city or area"
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="blood-group" className="text-sm font-medium">
                          Blood Group
                        </label>
                        <select
                          id="blood-group"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select blood group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="phone" className="pt-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <div className="flex">
                        <div className="inline-flex h-9 items-center justify-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                          +880
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="1XX XXX XXXX"
                          className="rounded-l-none w-full"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter>
                <Button className="w-full gap-2">
                  <Search className="h-4 w-4" />
                  Find Donors
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
