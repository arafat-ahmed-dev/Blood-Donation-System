import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import ProfileClient from "./ProfileClient"

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50">
        <div className="container">
          <ProfileClient />
        </div>
      </main>
      <Footer />
    </>
  )
}
// ;("use client")

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Switch } from "@/components/ui/switch"
// import { Progress } from "@/components/ui/progress"
// import { useToast } from "@/components/ui/use-toast"
// import { useAuth } from "@/components/auth/auth-provider"
// import {
//   Award,
//   Calendar,
//   CheckCircle,
//   Clock,
//   Droplet,
//   Edit,
//   FileText,
//   Heart,
//   History,
//   MapPin,
//   Phone,
//   Plus,
//   Settings,
//   Shield,
//   User,
//   XCircle,
// } from "lucide-react"

// function ProfileClientComponent() {
//   const [activeTab, setActiveTab] = useState("overview")
//   const [donationHistory, setDonationHistory] = useState([])
//   const [upcomingAppointments, setUpcomingAppointments] = useState([])
//   const [healthRecords, setHealthRecords] = useState([])
//   const [achievements, setAchievements] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const { user } = useAuth()
//   const { toast } = useToast()

//   useEffect(() => {
//     if (user) {
//       fetchUserData()
//     }
//   }, [user])

//   const fetchUserData = async () => {
//     setIsLoading(true)
//     try {
//       // Fetch donation history
//       const donationsRes = await fetch(`/api/donations?userId=${user?.id}`)
//       if (donationsRes.ok) {
//         const donationsData = await donationsRes.json()
//         setDonationHistory(donationsData.data || [])
//       }

//       // Fetch appointments
//       const appointmentsRes = await fetch(`/api/appointments?userId=${user?.id}`)
//       if (appointmentsRes.ok) {
//         const appointmentsData = await appointmentsRes.json()
//         setUpcomingAppointments(appointmentsData.data || [])
//       }

//       // Fetch health records
//       const healthRes = await fetch(`/api/health-records?userId=${user?.id}`)
//       if (healthRes.ok) {
//         const healthData = await healthRes.json()
//         setHealthRecords(healthData.data || [])
//       }

//       // Fetch achievements
//       const achievementsRes = await fetch(`/api/achievements?userId=${user?.id}`)
//       if (achievementsRes.ok) {
//         const achievementsData = await achievementsRes.json()
//         setAchievements(achievementsData.data || [])
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error)
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to load your profile data. Please try again.",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (!user) {
//     return (
//       <div className="container py-16 text-center">
//         <h1 className="text-2xl font-bold mb-4">Loading Profile</h1>
//         <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//       </div>
//     )
//   }

//   // Fallback data if API calls are not implemented yet
//   const fallbackDonations = [
//     {
//       id: "DON-1001",
//       date: "Apr 25, 2024",
//       location: "City General Hospital",
//       bloodType: "O+",
//       units: 1,
//       status: "Completed",
//     },
//     {
//       id: "DON-982",
//       date: "Feb 15, 2024",
//       location: "Downtown Blood Center",
//       bloodType: "O+",
//       units: 1,
//       status: "Completed",
//     },
//   ]

//   const fallbackAppointments = [
//     {
//       id: "APT-2045",
//       date: "May 30, 2024",
//       time: "10:30 AM",
//       location: "Downtown Blood Center",
//       status: "Confirmed",
//     },
//   ]

//   const fallbackAchievements = [
//     {
//       name: "First Time Donor",
//       description: "Completed your first blood donation",
//       icon: <Droplet className="h-5 w-5 text-red-600" />,
//       date: "Aug 1, 2023",
//       unlocked: true,
//     },
//     {
//       name: "Regular Donor",
//       description: "Donated blood 5 times",
//       icon: <Heart className="h-5 w-5 text-red-600" />,
//       date: "Apr 25, 2024",
//       unlocked: true,
//     },
//     {
//       name: "Lifesaver",
//       description: "Potentially saved up to 15 lives through donations",
//       icon: <Shield className="h-5 w-5 text-red-600" />,
//       date: "Apr 25, 2024",
//       unlocked: true,
//     },
//   ]

//   const displayDonations = donationHistory.length > 0 ? donationHistory : fallbackDonations
//   const displayAppointments = upcomingAppointments.length > 0 ? upcomingAppointments : fallbackAppointments
//   const displayAchievements = achievements.length > 0 ? achievements : fallbackAchievements

//   return (
//     <div className="container py-8">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Sidebar */}
//         <div className="md:w-1/3 lg:w-1/4">
//           <div className="sticky top-20 space-y-6">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex flex-col items-center text-center">
//                   <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
//                     <Image
//                       src={user.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
//                       alt={user.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <h2 className="text-xl font-bold">{user.name}</h2>
//                   <p className="text-muted-foreground">Donor ID: {user.id.substring(0, 8)}</p>
//                   <div className="flex items-center justify-center gap-1 mt-1">
//                     <Badge className="bg-red-600">{user.bloodType}</Badge>
//                     <Badge variant="outline">{user.donorLevel} Donor</Badge>
//                   </div>
//                   <div className="w-full mt-4">
//                     <Button className="w-full bg-red-600 hover:bg-red-700">Schedule Donation</Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-base">Donation Stats</CardTitle>
//               </CardHeader>
//               <CardContent className="pb-2">
//                 <div className="space-y-4">
//                   <div>
//                     <div className="flex justify-between text-sm mb-1">
//                       <span>Total Donations</span>
//                       <span className="font-medium">{user.totalDonations || 0}</span>
//                     </div>
//                     <div className="flex justify-between text-sm mb-1">
//                       <span>Lives Saved</span>
//                       <span className="font-medium">Up to {(user.totalDonations || 0) * 3}</span>
//                     </div>
//                     <div className="flex justify-between text-sm mb-1">
//                       <span>Last Donation</span>
//                       <span className="font-medium">
//                         {user.lastDonationDate ? new Date(user.lastDonationDate).toLocaleDateString() : "N/A"}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span>Next Eligible Date</span>
//                       <span className="font-medium text-green-600">
//                         {user.nextEligibleDate ? new Date(user.nextEligibleDate).toLocaleDateString() : "N/A"}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="pt-2 border-t">
//                     <div className="flex justify-between text-sm mb-1">
//                       <span>Donor Level</span>
//                       <span className="font-medium">{user.donorLevel}</span>
//                     </div>
//                     <div className="space-y-1">
//                       <div className="flex justify-between text-xs">
//                         <span>
//                           Progress to{" "}
//                           {user.donorLevel === "Bronze" ? "Silver" : user.donorLevel === "Silver" ? "Gold" : "Platinum"}
//                         </span>
//                         <span>
//                           {user.totalDonations}/
//                           {user.donorLevel === "Bronze" ? "5" : user.donorLevel === "Silver" ? "10" : "20"} donations
//                         </span>
//                       </div>
//                       <Progress
//                         value={
//                           user.donorLevel === "Bronze"
//                             ? (user.totalDonations / 5) * 100
//                             : user.donorLevel === "Silver"
//                               ? (user.totalDonations / 10) * 100
//                               : (user.totalDonations / 20) * 100
//                         }
//                         className="h-2"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-base">Quick Links</CardTitle>
//               </CardHeader>
//               <CardContent className="pb-2">
//                 <nav className="space-y-1">
//                   <button
//                     className={`flex items-center gap-2 p-2 rounded-md text-sm w-full text-left ${
//                       activeTab === "overview" ? "bg-red-100 text-red-600" : "hover:bg-muted"
//                     }`}
//                     onClick={() => setActiveTab("overview")}
//                   >
//                     <User className="h-4 w-4" />
//                     <span>Overview</span>
//                   </button>
//                   <button
//                     className={`flex items-center gap-2 p-2 rounded-md text-sm w-full text-left ${
//                       activeTab === "donations" ? "bg-red-100 text-red-600" : "hover:bg-muted"
//                     }`}
//                     onClick={() => setActiveTab("donations")}
//                   >
//                     <History className="h-4 w-4" />
//                     <span>Donation History</span>
//                   </button>
//                   <button
//                     className={`flex items-center gap-2 p-2 rounded-md text-sm w-full text-left ${
//                       activeTab === "appointments" ? "bg-red-100 text-red-600" : "hover:bg-muted"
//                     }`}
//                     onClick={() => setActiveTab("appointments")}
//                   >
//                     <Calendar className="h-4 w-4" />
//                     <span>Appointments</span>
//                   </button>
//                   <button
//                     className={`flex items-center gap-2 p-2 rounded-md text-sm w-full text-left ${
//                       activeTab === "health" ? "bg-red-100 text-red-600" : "hover:bg-muted"
//                     }`}
//                     onClick={() => setActiveTab("health")}
//                   >
//                     <Shield className="h-4 w-4" />
//                     <span>Health Records</span>
//                   </button>
//                   <button
//                     className={`flex items-center gap-2 p-2 rounded-md text-sm w-full text-left ${
//                       activeTab === "achievements" ? "bg-red-100 text-red-600" : "hover:bg-muted"
//                     }`}
//                     onClick={() => setActiveTab("achievements")}
//                   >
//                     <Award className="h-4 w-4" />
//                     <span>Achievements</span>
//                   </button>
//                   <button
//                     className={`flex items-center gap-2 p-2 rounded-md text-sm w-full text-left ${
//                       activeTab === "settings" ? "bg-red-100 text-red-600" : "hover:bg-muted"
//                     }`}
//                     onClick={() => setActiveTab("settings")}
//                   >
//                     <Settings className="h-4 w-4" />
//                     <span>Settings</span>
//                   </button>
//                 </nav>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="md:w-2/3 lg:w-3/4 space-y-6">
//           {/* Overview Tab */}
//           {activeTab === "overview" && (
//             <>
//               <Card>
//                 <CardHeader>
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <CardTitle>Personal Information</CardTitle>
//                       <CardDescription>Your basic information and contact details</CardDescription>
//                     </div>
//                     <Button variant="outline" size="sm" className="flex items-center gap-2">
//                       <Edit className="h-4 w-4" />
//                       <span>Edit</span>
//                     </Button>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-1">
//                       <p className="text-sm text-muted-foreground">Full Name</p>
//                       <p className="font-medium">{user.name}</p>
//                     </div>
//                     <div className="space-y-1">
//                       <p className="text-sm text-muted-foreground">Email</p>
//                       <p className="font-medium">{user.email}</p>
//                     </div>
//                     <div className="space-y-1">
//                       <p className="text-sm text-muted-foreground">Blood Type</p>
//                       <p className="font-medium">{user.bloodType}</p>
//                     </div>
//                     <div className="space-y-1">
//                       <p className="text-sm text-muted-foreground">Donor Level</p>
//                       <p className="font-medium">{user.donorLevel}</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Card>
//                   <CardHeader className="pb-2">
//                     <div className="flex justify-between items-center">
//                       <CardTitle>Upcoming Appointment</CardTitle>
//                       <Button variant="link" className="text-red-600 p-0 h-auto">
//                         View All
//                       </Button>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     {displayAppointments.length > 0 ? (
//                       <div className="space-y-4">
//                         {displayAppointments.map((appointment) => (
//                           <div key={appointment.id} className="flex items-start gap-4">
//                             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-700">
//                               <Calendar className="h-5 w-5" />
//                             </div>
//                             <div className="flex-1">
//                               <p className="font-medium">{appointment.location}</p>
//                               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                                 <Calendar className="h-4 w-4" />
//                                 <span>{appointment.date}</span>
//                               </div>
//                               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                                 <Clock className="h-4 w-4" />
//                                 <span>{appointment.time}</span>
//                               </div>
//                             </div>
//                             <Badge className="bg-green-600">{appointment.status}</Badge>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-6">
//                         <p className="text-muted-foreground mb-4">No upcoming appointments</p>
//                         <Button className="bg-red-600 hover:bg-red-700">Schedule Now</Button>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader className="pb-2">
//                     <div className="flex justify-between items-center">
//                       <CardTitle>Recent Donations</CardTitle>
//                       <Button variant="link" className="text-red-600 p-0 h-auto">
//                         View All
//                       </Button>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {displayDonations.slice(0, 2).map((donation) => (
//                         <div key={donation.id} className="flex items-start gap-4">
//                           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-700 font-bold">
//                             {donation.bloodType}
//                           </div>
//                           <div className="flex-1">
//                             <p className="font-medium">{donation.location}</p>
//                             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                               <Calendar className="h-4 w-4" />
//                               <span>{donation.date}</span>
//                             </div>
//                             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                               <Droplet className="h-4 w-4" />
//                               <span>{donation.units} unit</span>
//                             </div>
//                           </div>
//                           <Badge className="bg-green-600">{donation.status}</Badge>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <Card>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="flex items-center gap-2">
//                       <Award className="h-5 w-5 text-red-600" />
//                       <span>Achievements</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-3">
//                       {displayAchievements
//                         .filter((a) => a.unlocked)
//                         .slice(0, 3)
//                         .map((achievement) => (
//                           <div key={achievement.name} className="flex items-center gap-3">
//                             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
//                               {achievement.icon}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-medium truncate">{achievement.name}</p>
//                               <p className="text-xs text-muted-foreground truncate">{achievement.description}</p>
//                             </div>
//                           </div>
//                         ))}
//                     </div>
//                     <Button
//                       variant="link"
//                       className="w-full text-red-600 mt-2"
//                       onClick={() => setActiveTab("achievements")}
//                     >
//                       View All Achievements
//                     </Button>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="flex items-center gap-2">
//                       <Heart className="h-5 w-5 text-red-600" />
//                       <span>Impact</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-center py-2">
//                       <p className="text-3xl font-bold text-red-600">{(user.totalDonations || 0) * 3}</p>
//                       <p className="text-sm text-muted-foreground">Potential lives saved</p>
//                     </div>
//                     <div className="pt-4 border-t mt-2">
//                       <p className="text-sm text-center">Your donations have helped patients in:</p>
//                       <div className="flex justify-center gap-2 mt-2">
//                         <Badge variant="outline">Surgeries</Badge>
//                         <Badge variant="outline">Cancer Treatment</Badge>
//                         <Badge variant="outline">Trauma</Badge>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="flex items-center gap-2">
//                       <MapPin className="h-5 w-5 text-red-600" />
//                       <span>Preferred Center</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-3">
//                       <div className="font-medium">Downtown Blood Center</div>
//                       <div className="text-sm text-muted-foreground">
//                         456 Central Avenue
//                         <br />
//                         Cityville, State 12345
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <Phone className="h-4 w-4" />
//                         <span>(555) 987-6543</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <Clock className="h-4 w-4" />
//                         <span>Mon-Sat: 9AM-7PM</span>
//                       </div>
//                       <Button variant="outline" className="w-full mt-2">
//                         Get Directions
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </>
//           )}

//           {/* Donation History Tab */}
//           {activeTab === "donations" && (
//             <Card>
//               <CardHeader>
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <CardTitle>Donation History</CardTitle>
//                     <CardDescription>Record of all your blood donations</CardDescription>
//                   </div>
//                   <Button variant="outline" size="sm" className="flex items-center gap-2">
//                     <FileText className="h-4 w-4" />
//                     <span>Download History</span>
//                   </Button>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="rounded-lg border">
//                   <div className="grid grid-cols-6 border-b p-4 font-medium">
//                     <div>Donation ID</div>
//                     <div>Date</div>
//                     <div>Location</div>
//                     <div>Blood Type</div>
//                     <div>Units</div>
//                     <div>Status</div>
//                   </div>
//                   <div className="divide-y">
//                     {donationHistory.map((donation) => (
//                       <div key={donation.id} className="grid grid-cols-6 p-4 items-center">
//                         <div className="font-medium">{donation.id}</div>
//                         <div>{donation.date}</div>
//                         <div>{donation.location}</div>
//                         <div>{donation.bloodType}</div>
//                         <div>{donation.units}</div>
//                         <div>
//                           <Badge className="bg-green-600">{donation.status}</Badge>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter className="border-t pt-6 flex justify-between">
//                 <div className="text-sm text-muted-foreground">Showing {donationHistory.length} donations</div>
//                 <div className="flex items-center gap-2">
//                   <Button variant="outline" size="sm" disabled>
//                     Previous
//                   </Button>
//                   <Button variant="outline" size="sm" disabled>
//                     Next
//                   </Button>
//                 </div>
//               </CardFooter>
//             </Card>
//           )}

//           {/* Appointments Tab */}
//           {activeTab === "appointments" && (
//             <>
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                   <h2 className="text-2xl font-bold">Appointments</h2>
//                   <p className="text-muted-foreground">Manage your donation appointments</p>
//                 </div>
//                 <Button className="bg-red-600 hover:bg-red-700">
//                   <Plus className="mr-2 h-4 w-4" />
//                   Schedule New Appointment
//                 </Button>
//               </div>

//               <Tabs defaultValue="upcoming">
//                 <TabsList className="grid w-full md:w-[400px] grid-cols-3">
//                   <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//                   <TabsTrigger value="past">Past</TabsTrigger>
//                   <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="upcoming" className="mt-6">
//                   {upcomingAppointments.length > 0 ? (
//                     <Card>
//                       <CardContent className="p-6">
//                         <div className="space-y-6">
//                           {upcomingAppointments.map((appointment) => (
//                             <div
//                               key={appointment.id}
//                               className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg"
//                             >
//                               <div className="flex-1">
//                                 <div className="flex items-center gap-2 mb-2">
//                                   <Calendar className="h-5 w-5 text-red-600" />
//                                   <span className="font-medium">{appointment.date}</span>
//                                   <span className="text-muted-foreground">at</span>
//                                   <span className="font-medium">{appointment.time}</span>
//                                 </div>
//                                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                                   <MapPin className="h-4 w-4" />
//                                   <span>{appointment.location}</span>
//                                 </div>
//                                 <div className="flex items-center gap-2 mt-2">
//                                   <Badge className="bg-green-600">{appointment.status}</Badge>
//                                   <span className="text-xs text-muted-foreground">
//                                     Appointment ID: {appointment.id}
//                                   </span>
//                                 </div>
//                               </div>
//                               <div className="flex flex-col sm:flex-row gap-2">
//                                 <Button variant="outline" size="sm">
//                                   Reschedule
//                                 </Button>
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   className="text-red-600 border-red-200 hover:bg-red-50"
//                                 >
//                                   Cancel
//                                 </Button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ) : (
//                     <div className="text-center py-12 border rounded-lg bg-muted/50">
//                       <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//                       <h3 className="text-lg font-medium mb-2">No Upcoming Appointments</h3>
//                       <p className="text-muted-foreground mb-6">You don't have any scheduled appointments.</p>
//                       <Button className="bg-red-600 hover:bg-red-700">Schedule Now</Button>
//                     </div>
//                   )}
//                 </TabsContent>
//                 <TabsContent value="past" className="mt-6">
//                   <Card>
//                     <CardContent className="p-6">
//                       <div className="space-y-6">
//                         {[
//                           {
//                             id: "APT-1985",
//                             date: "Apr 25, 2024",
//                             time: "11:00 AM",
//                             location: "City General Hospital",
//                             status: "Completed",
//                           },
//                           {
//                             id: "APT-1856",
//                             date: "Feb 15, 2024",
//                             time: "9:30 AM",
//                             location: "Downtown Blood Center",
//                             status: "Completed",
//                           },
//                           {
//                             id: "APT-1742",
//                             date: "Dec 10, 2023",
//                             time: "2:15 PM",
//                             location: "University Hospital",
//                             status: "Completed",
//                           },
//                         ].map((appointment) => (
//                           <div
//                             key={appointment.id}
//                             className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg"
//                           >
//                             <div className="flex-1">
//                               <div className="flex items-center gap-2 mb-2">
//                                 <Calendar className="h-5 w-5 text-red-600" />
//                                 <span className="font-medium">{appointment.date}</span>
//                                 <span className="text-muted-foreground">at</span>
//                                 <span className="font-medium">{appointment.time}</span>
//                               </div>
//                               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                                 <MapPin className="h-4 w-4" />
//                                 <span>{appointment.location}</span>
//                               </div>
//                               <div className="flex items-center gap-2 mt-2">
//                                 <Badge className="bg-green-600">{appointment.status}</Badge>
//                                 <span className="text-xs text-muted-foreground">Appointment ID: {appointment.id}</span>
//                               </div>
//                             </div>
//                             <Button variant="outline" size="sm">
//                               View Details
//                             </Button>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//                 <TabsContent value="cancelled" className="mt-6">
//                   <div className="text-center py-12 border rounded-lg bg-muted/50">
//                     <XCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//                     <h3 className="text-lg font-medium mb-2">No Cancelled Appointments</h3>
//                     <p className="text-muted-foreground">You don't have any cancelled appointments.</p>
//                   </div>
//                 </TabsContent>
//               </Tabs>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Recommended Donation Centers</CardTitle>
//                   <CardDescription>Based on your location and donation history</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid gap-4 md:grid-cols-2">
//                     {[
//                       {
//                         name: "Downtown Blood Center",
//                         address: "456 Central Avenue, Cityville",
//                         distance: "2.5 miles",
//                         waitTime: "15 min",
//                       },
//                       {
//                         name: "City General Hospital",
//                         address: "123 Medical Drive, Cityville",
//                         distance: "1.2 miles",
//                         waitTime: "30 min",
//                       },
//                       {
//                         name: "University Hospital",
//                         address: "101 University Way, Collegetown",
//                         distance: "5.2 miles",
//                         waitTime: "10 min",
//                       },
//                       {
//                         name: "Westside Medical Center",
//                         address: "789 Westview Blvd, Cityville",
//                         distance: "3.8 miles",
//                         waitTime: "5 min",
//                       },
//                     ].map((center, index) => (
//                       <div key={index} className="flex flex-col p-4 border rounded-lg">
//                         <div className="font-medium mb-1">{center.name}</div>
//                         <div className="text-sm text-muted-foreground mb-2">{center.address}</div>
//                         <div className="flex items-center gap-4 text-sm">
//                           <div className="flex items-center gap-1">
//                             <MapPin className="h-4 w-4 text-muted-foreground" />
//                             <span>{center.distance}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Clock className="h-4 w-4 text-muted-foreground" />
//                             <span>Wait: {center.waitTime}</span>
//                           </div>
//                         </div>
//                         <Button className="mt-4 bg-red-600 hover:bg-red-700">Book Appointment</Button>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </>
//           )}

//           {/* Health Records Tab */}
//           {activeTab === "health" && (
//             <Card>
//               <CardHeader>
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <CardTitle>Health Records</CardTitle>
//                     <CardDescription>Your health information from donation visits</CardDescription>
//                   </div>
//                   <Button variant="outline" size="sm" className="flex items-center gap-2">
//                     <FileText className="h-4 w-4" />
//                     <span>Download Records</span>
//                   </Button>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-6">
//                   {healthRecords.map((record, index) => (
//                     <div key={index} className="p-4 border rounded-lg">
//                       <div className="flex justify-between items-center mb-4">
//                         <h3 className="font-medium">Health Check: {record.date}</h3>
//                         <Badge variant="outline">Donation Visit</Badge>
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//                         <div>
//                           <p className="text-sm text-muted-foreground">Hemoglobin</p>
//                           <p className="font-medium">{record.hemoglobin}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground">Blood Pressure</p>
//                           <p className="font-medium">{record.bloodPressure}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground">Pulse</p>
//                           <p className="font-medium">{record.pulse}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground">Weight</p>
//                           <p className="font-medium">{record.weight}</p>
//                         </div>
//                       </div>
//                       <div className="pt-2 border-t">
//                         <p className="text-sm text-muted-foreground">Notes</p>
//                         <p>{record.notes}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Achievements Tab */}
//           {activeTab === "achievements" && (
//             <>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Your Achievements</CardTitle>
//                   <CardDescription>Badges and milestones earned through your donations</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid gap-6 md:grid-cols-2">
//                     {achievements.map((achievement) => (
//                       <div
//                         key={achievement.name}
//                         className={`p-4 border rounded-lg ${!achievement.unlocked ? "opacity-70" : ""}`}
//                       >
//                         <div className="flex items-start gap-4">
//                           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
//                             {achievement.icon}
//                           </div>
//                           <div className="flex-1">
//                             <h3 className="font-medium">{achievement.name}</h3>
//                             <p className="text-sm text-muted-foreground">{achievement.description}</p>
//                             {achievement.unlocked ? (
//                               <div className="flex items-center gap-2 mt-2 text-sm">
//                                 <CheckCircle className="h-4 w-4 text-green-600" />
//                                 <span>Unlocked on {achievement.date}</span>
//                               </div>
//                             ) : (
//                               <div className="mt-2">
//                                 <div className="flex justify-between text-xs mb-1">
//                                   <span>Progress</span>
//                                   <span>{achievement.progress}%</span>
//                                 </div>
//                                 <Progress value={achievement.progress} className="h-2" />
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Upcoming Achievements</CardTitle>
//                   <CardDescription>Your next milestones to reach</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {[
//                       {
//                         name: "Silver Donor",
//                         description: "Complete 10 blood donations",
//                         progress: 50,
//                         remaining: "5 more donations needed",
//                       },
//                       {
//                         name: "One Year Active",
//                         description: "Maintain active donor status for one year",
//                         progress: 65,
//                         remaining: "127 days remaining",
//                       },
//                       {
//                         name: "Critical Need Responder",
//                         description: "Donate during 3 critical need periods",
//                         progress: 33,
//                         remaining: "2 more critical donations needed",
//                       },
//                     ].map((achievement, index) => (
//                       <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
//                         <div className="flex-1">
//                           <h3 className="font-medium">{achievement.name}</h3>
//                           <p className="text-sm text-muted-foreground">{achievement.description}</p>
//                           <div className="mt-2">
//                             <div className="flex justify-between text-xs mb-1">
//                               <span>Progress</span>
//                               <span>{achievement.progress}%</span>
//                             </div>
//                             <Progress value={achievement.progress} className="h-2" />
//                           </div>
//                         </div>
//                         <div className="text-sm text-muted-foreground">{achievement.remaining}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </>
//           )}

//           {/* Settings Tab */}
//           {activeTab === "settings" && (
//             <>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Account Settings</CardTitle>
//                   <CardDescription>Manage your account preferences</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-medium">Personal Information</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="fullName">Full Name</Label>
//                         <Input id="fullName" defaultValue="John Smith" />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="email">Email</Label>
//                         <Input id="email" type="email" defaultValue="john.smith@example.com" />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="phone">Phone</Label>
//                         <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="dob">Date of Birth</Label>
//                         <Input id="dob" type="date" defaultValue="1985-01-15" />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="address">Address</Label>
//                       <Textarea id="address" defaultValue="123 Main Street, Apt 4B&#10;Cityville, State 12345" />
//                     </div>
//                     <Button className="bg-red-600 hover:bg-red-700">Save Changes</Button>
//                   </div>

//                   <div className="pt-6 border-t space-y-4">
//                     <h3 className="text-lg font-medium">Notification Preferences</h3>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <div className="space-y-0.5">
//                           <Label htmlFor="emailNotifications">Email Notifications</Label>
//                           <p className="text-sm text-muted-foreground">
//                             Receive appointment reminders and updates via email
//                           </p>
//                         </div>
//                         <Switch id="emailNotifications" defaultChecked />
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div className="space-y-0.5">
//                           <Label htmlFor="smsNotifications">SMS Notifications</Label>
//                           <p className="text-sm text-muted-foreground">
//                             Receive appointment reminders and updates via text message
//                           </p>
//                         </div>
//                         <Switch id="smsNotifications" defaultChecked />
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div className="space-y-0.5">
//                           <Label htmlFor="urgentRequests">Urgent Blood Requests</Label>
//                           <p className="text-sm text-muted-foreground">
//                             Be notified when your blood type is urgently needed
//                           </p>
//                         </div>
//                         <Switch id="urgentRequests" defaultChecked />
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div className="space-y-0.5">
//                           <Label htmlFor="marketingEmails">Marketing Communications</Label>
//                           <p className="text-sm text-muted-foreground">Receive newsletters and promotional materials</p>
//                         </div>
//                         <Switch id="marketingEmails" />
//                       </div>
//                     </div>
//                     <Button className="bg-red-600 hover:bg-red-700">Save Preferences</Button>
//                   </div>

//                   <div className="pt-6 border-t space-y-4">
//                     <h3 className="text-lg font-medium">Security</h3>
//                     <div className="space-y-4">
//                       <Button variant="outline" className="w-full md:w-auto">
//                         Change Password
//                       </Button>
//                       <Button variant="outline" className="w-full md:w-auto">
//                         Enable Two-Factor Authentication
//                       </Button>
//                     </div>
//                   </div>

//                   <div className="pt-6 border-t space-y-4">
//                     <h3 className="text-lg font-medium">Privacy</h3>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <div className="space-y-0.5">
//                           <Label htmlFor="dataSharing">Data Sharing</Label>
//                           <p className="text-sm text-muted-foreground">
//                             Allow anonymous data to be used for research purposes
//                           </p>
//                         </div>
//                         <Switch id="dataSharing" defaultChecked />
//                       </div>
//                       <Button variant="outline" className="w-full md:w-auto">
//                         Download My Data
//                       </Button>
//                       <Button
//                         variant="outline"
//                         className="w-full md:w-auto text-red-600 border-red-200 hover:bg-red-50"
//                       >
//                         Delete Account
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProfileClientComponent
