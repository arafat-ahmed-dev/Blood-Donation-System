"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useProfile } from "@/hooks/useProfile"
import { useDonations } from "@/hooks/useDonations"
import { useAppointments } from "@/hooks/useAppointments"
import { useAuth } from "@/components/auth/auth-provider"

import { ProfileSidebar } from "@/components/profile/ProfileSidebar"
import { ProfileStats } from "@/components/profile/ProfileStats"
import { QuickLinks } from "@/components/profile/QuickLinks"
import { PersonalInfo } from "@/components/profile/PersonalInfo"
import { UpcomingAppointment } from "@/components/profile/UpcomingAppointment"
import { RecentDonations } from "@/components/profile/RecentDonations"
import { ImpactSummary } from "@/components/profile/ImpactSummary"
import { DonationHistory } from "@/components/profile/DonationHistory"
import { AppointmentsList } from "@/components/profile/AppointmentsList"
import { ProfileSettings } from "@/components/profile/ProfileSettings"

export default function ProfileClient() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user, isLoading: profileLoading } = useProfile()
  const { donations, isLoading: donationsLoading } = useDonations(user?.id)
  const { appointments, isLoading: appointmentsLoading } = useAppointments(user?.id)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?redirect=/profile")
    }
  }, [isAuthenticated, router])

  if (profileLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  const fullName = `${user?.name}`
  const initials = user?.name.split(' ').map(n => n[0]).join('')
  const bloodGroup = user?.bloodType
  const donationCount = donations?.length || 0
  const nextAppointment = appointments?.find((a: any) => a.status === "Confirmed")
  const eligibilityStatus =
    !user?.nextEligibleDate ? "Available" :
      new Date(user.nextEligibleDate) > new Date() ? "Not Available" : "Available"
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="md:w-1/3 lg:w-1/4">
        <div className="sticky top-20 space-y-6">
          <ProfileSidebar
            user={user}
            eligibilityStatus={eligibilityStatus}
            fullName={fullName}
            initials={initials}
            bloodGroup={bloodGroup}
          />
          <ProfileStats donationCount={donationCount} user={user} />
          <QuickLinks activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Main Content */}
      <div className="md:w-2/3 lg:w-3/4 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="overview" className="space-y-6">
            <PersonalInfo
              user={user}
              fullName={fullName}
              bloodGroup={bloodGroup}
              eligibilityStatus={eligibilityStatus}
              setActiveTab={setActiveTab}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UpcomingAppointment nextAppointment={nextAppointment} setActiveTab={setActiveTab} />
              <RecentDonations donations={donations} setActiveTab={setActiveTab} />
            </div>

            <ImpactSummary donationCount={donationCount} user={user} />
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <DonationHistory donations={donations} donationsLoading={donationsLoading} />
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <AppointmentsList appointments={appointments} appointmentsLoading={appointmentsLoading} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <ProfileSettings user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


