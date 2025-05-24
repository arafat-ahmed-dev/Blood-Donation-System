import { Calendar, Droplet, FileText, Heart, LayoutDashboard, Link, MapPin, Settings, Users } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
interface SideBarProps {
  selectedTab: string;
  setSelectedTab : (prep:string)=> void;
}
function SideBar({selectedTab , setSelectedTab}: SideBarProps) {
  return (
    <div className="hidden lg:flex w-64 flex-col fixed inset-y-0 border-r bg-background z-30">
      <div className="flex items-center gap-2 px-6 py-4 h-16 border-b">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={25}
          height={25}
          className="rounded-full"
        />
        <span className="text-lg font-bold">Rokto Shetu Admin</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              selectedTab === "overview"
                ? "bg-red-100 text-red-600"
                : "hover:bg-muted"
            }`}
            onClick={() => setSelectedTab("overview")}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Overview</span>
          </Link>
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              selectedTab === "inventory"
                ? "bg-red-100 text-red-600"
                : "hover:bg-muted"
            }`}
            onClick={() => setSelectedTab("inventory")}
          >
            <Droplet className="h-5 w-5" />
            <span>Blood Inventory</span>
          </Link>
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              selectedTab === "donors"
                ? "bg-red-100 text-red-600"
                : "hover:bg-muted"
            }`}
            onClick={() => setSelectedTab("donors")}
          >
            <Users className="h-5 w-5" />
            <span>Donors</span>
          </Link>
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              selectedTab === "requests"
                ? "bg-red-100 text-red-600"
                : "hover:bg-muted"
            }`}
            onClick={() => setSelectedTab("requests")}
          >
            <Heart className="h-5 w-5" />
            <span>Blood Requests</span>
          </Link>
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              selectedTab === "appointments"
                ? "bg-red-100 text-red-600"
                : "hover:bg-muted"
            }`}
            onClick={() => setSelectedTab("appointments")}
          >
            <Calendar className="h-5 w-5" />
            <span>Appointments</span>
          </Link>
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              selectedTab === "centers"
                ? "bg-red-100 text-red-600"
                : "hover:bg-muted"
            }`}
            onClick={() => setSelectedTab("centers")}
          >
            <MapPin className="h-5 w-5" />
            <span>Donation Centers</span>
          </Link>
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              selectedTab === "reports"
                ? "bg-red-100 text-red-600"
                : "hover:bg-muted"
            }`}
            onClick={() => setSelectedTab("reports")}
          >
            <FileText className="h-5 w-5" />
            <span>Reports</span>
          </Link>
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${
              selectedTab === "settings"
                ? "bg-red-100 text-red-600"
                : "hover:bg-muted"
            }`}
            onClick={() => setSelectedTab("settings")}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Admin"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@lifeflow.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar