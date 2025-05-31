import {
  Calendar,
  Droplet,
  FileText,
  Heart,
  LayoutDashboard,
  MapPin,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface SideBarProps {
  selectedTab: string;
  setSelectedTab: (prep: string) => void;
}

function SideBar({ selectedTab, setSelectedTab }: SideBarProps) {
  const sideBarOptions = [
    { key: "Overview", value: "overview", icon: LayoutDashboard },
    { key: "Blood Inventory", value: "inventory", icon: Droplet },
    { key: "Donors", value: "donors", icon: Users },
    { key: "Blood Requests", value: "requests", icon: Heart },
    { key: "Appointments", value: "appointments", icon: Calendar },
    { key: "Centers", value: "centers", icon: MapPin },
    { key: "Reports", value: "reports", icon: FileText },
    { key: "Settings", value: "settings", icon: Settings },
  ];

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
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {sideBarOptions.map(({ key, value, icon: Icon }) => (
            <Button
              key={value}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 px-3 py-2 h-11 font-medium transition-all duration-200",
                "hover:bg-red-50 hover:text-red-600",
                "active:scale-[0.98]",
                selectedTab === value &&
                  "bg-red-100 text-red-600 hover:bg-red-100"
              )}
              onClick={() => setSelectedTab(value)}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="truncate">{key}</span>
            </Button>
          ))}
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

export default SideBar;
