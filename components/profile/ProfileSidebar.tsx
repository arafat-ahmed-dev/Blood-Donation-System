import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Droplet,
  Heart,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  Award,
  Activity,
} from "lucide-react";

interface ProfileSidebarProps {
  user: any;
  eligibilityStatus: string;
  fullName: string;
  initials: string;
  bloodGroup: string;
}

export function ProfileSidebar({
  user,
  eligibilityStatus,
  fullName,
  initials,
  bloodGroup,
}: ProfileSidebarProps) {
  const getStatusInfo = () => {
    if (eligibilityStatus === "Available") {
      return {
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: <Heart className="w-4 h-4 text-green-500" />,
        text: "Available to Donate",
      };
    }
    return {
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: <Activity className="w-4 h-4 text-yellow-500" />,
      text: "Cooling Period",
    };
  };

  const status = getStatusInfo();
  console.log(user)
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3">
            {user?.image ? (
              <Image
                src={user?.image || "/placeholder.svg"}
                alt={fullName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {initials}
                </span>
              </div>
            )}
          </div>
          <h2 className="text-lg font-semibold mb-1">{fullName}</h2>
          <p className="text-sm text-muted-foreground mb-3">
            ID: {user?.id.substring(0, 8)}
          </p>

          {/* Blood Type and Status */}
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-red-50 border border-red-100">
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium">Blood Type</span>
              </div>
              <Badge
                variant="secondary"
                className="bg-white text-red-600 border-red-200"
              >
                {bloodGroup}
              </Badge>
            </div>

            <div
              className={`flex items-center justify-between p-2 rounded-lg ${status.bgColor} border ${status.borderColor}`}
            >
              <div className="flex items-center gap-2">
                {status.icon}
                <span className="text-sm font-medium">Status</span>
              </div>
              <Badge
                variant="secondary"
                className={`${status.bgColor} ${status.color} ${status.borderColor} border`}
              >
                {status.text}
              </Badge>
            </div>
          </div>

          <div className="w-full mt-4">
            <Button
              className="w-full bg-red-500 hover:bg-red-600 text-white"
              disabled={eligibilityStatus === "Not Available"}
            >
              Schedule Donation
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
