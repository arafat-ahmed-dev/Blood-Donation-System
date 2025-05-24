"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useProfile } from "@/hooks/useProfile";
import { useDonations } from "@/hooks/useDonations";
import { useAppointments } from "@/hooks/useAppointments";
import { useAuth } from "@/components/auth/auth-provider";
import { useSession } from "next-auth/react";

import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { QuickLinks } from "@/components/profile/QuickLinks";
import { PersonalInfo } from "@/components/profile/PersonalInfo";
import { UpcomingAppointment } from "@/components/profile/UpcomingAppointment";
import { RecentDonations } from "@/components/profile/RecentDonations";
import { ImpactSummary } from "@/components/profile/ImpactSummary";
import { DonationHistory } from "@/components/profile/DonationHistory";
import { AppointmentsList } from "@/components/profile/AppointmentsList";
import { ProfileSettings } from "@/components/profile/ProfileSettings";
import ProfileLoading from "./loading";

interface Appointment {
  id: string;
  date: string;
  time: string;
  location: string;
  status: string;
}

export default function ProfileClient() {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: session, status } = useSession();
  const { user, isLoading: profileLoading } = useProfile();
  const { donations, isLoading: donationsLoading } = useDonations(user?.id);
  const { appointments, isLoading: appointmentsLoading } = useAppointments(
    user?.id
  );
  const router = useRouter();

  // Track which sections have been loaded
  const [loadedSections, setLoadedSections] = useState({
    overview: false,
    donations: false,
    appointments: false,
    settings: false,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth?redirect=/profile");
    }
  }, [status, router]);

  // Mark sections as loaded when their data is ready
  useEffect(() => {
    if (user && !profileLoading) {
      setLoadedSections((prev) => ({ ...prev, overview: true }));
    }
  }, [user, profileLoading]);

  useEffect(() => {
    if (donations && !donationsLoading) {
      setLoadedSections((prev) => ({ ...prev, donations: true }));
    }
  }, [donations, donationsLoading]);

  useEffect(() => {
    if (appointments && !appointmentsLoading) {
      setLoadedSections((prev) => ({ ...prev, appointments: true }));
    }
  }, [appointments, appointmentsLoading]);

  // Show loading state for initial load or when switching to unloaded sections
  if (
    status === "loading" ||
    profileLoading ||
    !user ||
    (activeTab === "donations" && !loadedSections.donations) ||
    (activeTab === "appointments" && !loadedSections.appointments)
  ) {
    return <ProfileLoading />;
  }

  const fullName = `${user?.name}`;
  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const bloodGroup = user?.bloodType;
  const donationCount = donations?.length || 0;

  // Find the next upcoming appointment
  const nextAppointment = appointments?.reduce(
    (next: Appointment | null, current: Appointment) => {
      if (current.status !== "Confirmed") return next;

      const currentDate = new Date(current.date);
      const nextDate = next ? new Date(next.date) : null;

      if (!nextDate || currentDate < nextDate) {
        return current;
      }
      return next;
    },
    null
  );

  const eligibilityStatus = !user?.nextEligibleDate
    ? "Available"
    : new Date(user.nextEligibleDate) > new Date()
    ? "Not Available"
    : "Available";

  return (
    <div className="flex flex-col md:flex-row gap-4 p-2 animate-in fade-in duration-500">
      {/* Sidebar */}
      <div className="md:w-1/3 lg:w-1/4">
        <div className="sticky top-20 space-y-4 transition-all duration-300 ease-in-out hover:shadow-lg rounded-lg p-3 bg-background border border-border/50">
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
      <div className="md:w-2/3 lg:w-3/4 space-y-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="transition-all duration-300"
        >
          <TabsContent value="overview" className="space-y-4">
            <div className="bg-background p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="group-hover:scale-[1.01] transition-transform duration-300">
                <PersonalInfo
                  user={user}
                  fullName={fullName}
                  bloodGroup={bloodGroup}
                  eligibilityStatus={eligibilityStatus}
                  setActiveTab={setActiveTab}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
                <div className="group-hover:scale-[1.02] transition-transform duration-300">
                  <UpcomingAppointment
                    nextAppointment={nextAppointment}
                    setActiveTab={setActiveTab}
                    isLoading={appointmentsLoading}
                  />
                </div>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
                <div className="group-hover:scale-[1.02] transition-transform duration-300">
                  <RecentDonations
                    donations={donations?.slice(0, 5)}
                    setActiveTab={setActiveTab}
                  />
                </div>
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="group-hover:scale-[1.01] transition-transform duration-300">
                <ImpactSummary donationCount={donationCount} user={user} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="donations" className="space-y-4">
            <div className="bg-background p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="group-hover:scale-[1.01] transition-transform duration-300">
                <DonationHistory
                  donations={donations}
                  donationsLoading={donationsLoading}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <div className="bg-background p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="group-hover:scale-[1.01] transition-transform duration-300">
                <AppointmentsList
                  appointments={appointments}
                  appointmentsLoading={appointmentsLoading}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="bg-background p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="group-hover:scale-[1.01] transition-transform duration-300">
                <ProfileSettings user={user} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
