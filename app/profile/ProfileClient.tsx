"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Droplet, History, MapPin, Settings, Shield, User } from "lucide-react"
import { useProfile } from "@/hooks/useProfile"
import { useDonations } from "@/hooks/useDonations"
import { useAppointments } from "@/hooks/useAppointments"
import { useAuth } from "@/hooks/useAuth"
import { formatBloodGroup } from "@/lib/utils"

export default function ProfileClient() {
  const user = {
    id: "usr_001",
    name: "Rahim Ahmed",
    email: "rahim.ahmed@example.com",
    phone: "01712345678",
    address: "123 Lake View Road",
    city: "Dhaka",
    upazila: "Gulshan",
    zip: "1212",
    bloodType: "A+",
    dateOfBirth: "1990-05-15",
    lastDonation: "2025-03-01",
    nextEligibleDate: "2025-04-4",
    donorLevel: "Gold",
    totalDonations: 12,
    isAdmin: false,
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  };
  const [activeTab, setActiveTab] = useState("overview")
  // const { user, isLoading: profileLoading } = useProfile()
  const { donations, isLoading: donationsLoading } = useDonations(user?.id)
  const { appointments, isLoading: appointmentsLoading } = useAppointments(user?.id)
  // const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const isAuthenticated = true // Replace with actual authentication check


  if (!isAuthenticated) {
    router.push("/auth/login?redirect=/profile")
    return null
  }
  // if (profileLoading || !user) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[60vh]">
  //       <div className="text-center">
  //         <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
  //         <p className="text-muted-foreground">Loading profile...</p>
  //       </div>
  //     </div>
  //   )
  // }

  const fullName = `${user?.name}`;
  const initials = user?.name.split(' ').map(n => n[0]).join('');
  const bloodGroup = user?.bloodType
  const donationCount = donations?.length || 0
  const nextAppointment = appointments?.find((a: any) => a.status === "Confirmed")
  const eligibilityStatus =
    !user?.nextEligibleDate ? "Available" :  // If no previous donation, they're available
      new Date(user.nextEligibleDate) > new Date() ? "Not Available" : "Available";
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="md:w-1/3 lg:w-1/4">
        <div className="sticky top-20 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                  {user?.image ? (
                    <Image src={user?.image || "/placeholder.svg"} alt={fullName} fill className="object-cover" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{initials}</span>
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold">{fullName}</h2>
                <p className="text-muted-foreground">Donor ID: {user?.id.substring(0, 8)}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Badge className="bg-primary">{bloodGroup}</Badge>
                  <Badge variant="outline">{eligibilityStatus !== "Not Available" ? "Available" : "Not Available"}</Badge>
                </div>
                <div className="w-full mt-4">
                  <Button className="w-full" disabled={eligibilityStatus === "Not Available"}>
                    Schedule Donation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Donation Stats</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Total Donations</span>
                    <span className="font-medium">{donationCount}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Lives Saved</span>
                    <span className="font-medium">Up to {donationCount * 3}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Last Donation</span>
                    <span className="font-medium">
                      {user?.lastDonation
                        ? new Date(user?.lastDonation).toLocaleDateString()
                        : "No donations yet"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Next Eligible Date</span>
                    <span className="font-medium text-green-600">
                      {user?.nextEligibleDate ? new Date(user.nextEligibleDate).toLocaleDateString() : "Available now"}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Donor Level</span>
                    <span className="font-medium">
                      {donationCount >= 10 ? "Gold" : donationCount >= 5 ? "Silver" : "Bronze"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>
                        Progress to {donationCount >= 10 ? "Platinum" : donationCount >= 5 ? "Gold" : "Silver"}
                      </span>
                      <span>
                        {donationCount}/{donationCount >= 10 ? "20" : donationCount >= 5 ? "10" : "5"} donations
                      </span>
                    </div>
                    <Progress
                      value={
                        donationCount >= 10
                          ? (donationCount / 20) * 100
                          : donationCount >= 5
                            ? (donationCount / 10) * 100
                            : (donationCount / 5) * 100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <nav className="space-y-1">
                <button
                  className={`flex items-center gap-2 p-2 rounded-md text-sm w-full text-left ${activeTab === "overview" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <User className="h-4 w-4" />
                  <span>Overview</span>
                </button>
                <button
                  className={`flex items-center gap-2 p-2 rounded-md text-sm w-full text-left ${activeTab === "donations" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    }`}
                  onClick={() => setActiveTab("donations")}
                >
                  <History className="h-4 w-4" />
                  <span>Donation History</span>
                </button>
                <button
                  className={`flex items-center gap-2 p-2 rounded-md text-sm w-full text-left ${activeTab === "appointments" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    }`}
                  onClick={() => setActiveTab("appointments")}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Appointments</span>
                </button>
                <button
                  className={`flex items-center gap-2 p-2 rounded-md text-sm w-full text-left ${activeTab === "settings" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    }`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:w-2/3 lg:w-3/4 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your basic information and contact details</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("settings")}>
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{fullName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Blood Type</p>
                    <p className="font-medium">{bloodGroup}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{user?.phone || "Not provided"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">
                      {user?.city ? (
                        <>
                          {user?.address}, {user?.upazila}, {user?.city}
                        </>
                      ) : (
                        "Not provided"
                      )}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Eligibility Status</p>
                    <p className={`font-medium ${eligibilityStatus === "Available" ? "text-green-600" : "text-red-600"}`}>
                      {eligibilityStatus === "Available" ? "Available to donate" : "Not eligible until next eligible date"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Upcoming Appointment</CardTitle>
                    <Button
                      variant="link"
                      className="text-primary p-0 h-auto"
                      onClick={() => setActiveTab("appointments")}
                    >
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {nextAppointment ? (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{nextAppointment.location}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(nextAppointment.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{nextAppointment.time}</span>
                          </div>
                        </div>
                        <Badge className="bg-green-600">{nextAppointment.status}</Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                      <Button>Schedule Now</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Donations</CardTitle>
                    <Button
                      variant="link"
                      className="text-primary p-0 h-auto"
                      onClick={() => setActiveTab("donations")}
                    >
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {donations && donations.length > 0 ? (
                    <div className="space-y-4">
                      {donations.slice(0, 2).map((donation: any) => (
                        <div key={donation.id} className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                            <Droplet className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{donation.location}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(donation.donationDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Droplet className="h-4 w-4" />
                              <span>{donation.units} unit</span>
                            </div>
                          </div>
                          <Badge className="bg-green-600">{donation.status}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No donation history yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Impact Summary</CardTitle>
                <CardDescription>The difference your donations have made</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <Droplet className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{donationCount}</p>
                    <p className="text-sm text-muted-foreground">Total Donations</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">Up to {donationCount * 3}</p>
                    <p className="text-sm text-muted-foreground">Lives Potentially Saved</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{user?.city || "N/A"}</p>
                    <p className="text-sm text-muted-foreground">Community Served</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Donation History</CardTitle>
                    <CardDescription>Record of all your blood donations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {donationsLoading ? (
                  <div className="text-center py-8">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading donations...</p>
                  </div>
                ) : donations && donations.length > 0 ? (
                  <div className="rounded-lg border">
                    <div className="grid grid-cols-5 border-b p-4 font-medium">
                      <div>Date</div>
                      <div>Location</div>
                      <div>Blood Type</div>
                      <div>Units</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {donations.map((donation: any) => (
                        <div key={donation.id} className="grid grid-cols-5 p-4 items-center">
                          <div>{new Date(donation.donationDate).toLocaleDateString()}</div>
                          <div>{donation.location}</div>
                          <div>{formatBloodGroup(donation.bloodType)}</div>
                          <div>{donation.units}</div>
                          <div>
                            <Badge className="bg-green-600">{donation.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No donation history found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Appointments</CardTitle>
                    <CardDescription>Your scheduled donation appointments</CardDescription>
                  </div>
                  <Button>Schedule New Appointment</Button>
                </div>
              </CardHeader>
              <CardContent>
                {appointmentsLoading ? (
                  <div className="text-center py-8">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading appointments...</p>
                  </div>
                ) : appointments && appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment: any) => (
                      <div
                        key={appointment.id}
                        className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            <span className="font-medium">{new Date(appointment.date).toLocaleDateString()}</span>
                            <span className="text-muted-foreground">at</span>
                            <span className="font-medium">{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{appointment.location}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              className={
                                appointment.status === "Confirmed"
                                  ? "bg-green-600"
                                  : appointment.status === "Completed"
                                    ? "bg-blue-600"
                                    : "bg-yellow-600"
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" size="sm" disabled={appointment.status === "Completed"}>
                            Reschedule
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            disabled={appointment.status === "Completed"}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No appointments found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <ProfileSettings user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ProfileSettings({ user }: { user: any }) {
  const { updateProfile, isLoading } = useProfile()
  const { logout } = useAuth()
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone || "",
    address: user.location?.address || "",
    city: user.location?.city || "",
    upazila: user.location?.upazila || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const result = await updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      upazila: formData.upazila,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    })

    if (result) {
      setSuccess("Profile updated successfully")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Update your personal information and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4 text-sm">
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-800 p-3 rounded-md mb-4 text-sm">
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Address</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="upazila" className="text-sm font-medium">
                    Upazila
                  </label>
                  <input
                    id="upazila"
                    name="upazila"
                    value={formData.upazila}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>



          <div className="flex justify-between pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button type="button" variant="destructive" onClick={logout}>
              Logout
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
