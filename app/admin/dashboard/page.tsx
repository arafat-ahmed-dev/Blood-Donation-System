"use client";

import { useState } from "react";
import DashboardSettings from "@/components/adminDashboard/Settings";
import DonationCentersDashboard from "@/components/adminDashboard/Centers";
import SideBar from "@/components/adminDashboard/SideBar";
import HeaderDashboard from "@/components/adminDashboard/Header";
import InventoryDashboard from "@/components/adminDashboard/Inventory";
import OverviewDashboard from "@/components/adminDashboard/Overview";
import DonorsDashboard from "@/components/adminDashboard/Donors";
import RequestsDashboard from "@/components/adminDashboard/Requests";
import AppointmentsDashboard from "@/components/adminDashboard/Appointments";
import ReportsDashboard from "@/components/adminDashboard/Reports";

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("inventory=");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        {/* Top Navigation */}
        <HeaderDashboard />

        {/* Dashboard Content */}
        <main className="p-4 md:p-6">
          {/* Overview Tab */}
          {selectedTab === "overview" && <OverviewDashboard />}

          {/* Inventory Tab */}
          {selectedTab === "inventory" && <InventoryDashboard />}

          {/* Donors Tab */}
          {selectedTab === "donors" && <DonorsDashboard />}

          {/* Requests Tab */}
          {selectedTab === "requests" && <RequestsDashboard />}

          {/* Appointments Tab */}
          {selectedTab === "appointments" && <AppointmentsDashboard />}

          {/* Reports Tab */}
          {selectedTab === "reports" && <ReportsDashboard />}
          {selectedTab === "centers" && <DonationCentersDashboard />}
          {selectedTab === "settings" && <DashboardSettings />}
        </main>
      </div>
    </div>
  );
}
