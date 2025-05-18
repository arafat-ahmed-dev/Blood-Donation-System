import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User,
  Mail,
  Droplet,
  Phone,
  MapPin,
  Activity,
  Pencil,
} from "lucide-react";

interface PersonalInfoProps {
  user: any;
  fullName: string;
  bloodGroup: string;
  eligibilityStatus: string;
  setActiveTab: (tab: string) => void;
}

export function PersonalInfo({
  user,
  fullName,
  bloodGroup,
  eligibilityStatus,
  setActiveTab,
}: PersonalInfoProps) {
  return (
    <Card className="border-2">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
            </div>
            <div>
              <CardTitle className="text-xl sm:text-2xl">
                Personal Information
              </CardTitle>
              <CardDescription className="text-sm">
                Your basic information and contact details
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("settings")}
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 flex items-center gap-2 text-xs sm:text-sm w-full sm:w-auto justify-center"
          >
            <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
            Edit Profile
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="p-3 sm:p-4 bg-gray-50 rounded-lg space-y-1 sm:space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4" />
              <p className="text-xs sm:text-sm">Full Name</p>
            </div>
            <p className="font-medium text-sm sm:text-lg pl-6">{fullName}</p>
          </div>

          <div className="p-3 sm:p-4 bg-gray-50 rounded-lg space-y-1 sm:space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <p className="text-xs sm:text-sm">Email</p>
            </div>
            <p className="font-medium text-sm sm:text-lg pl-6 break-all">
              {user?.email}
            </p>
          </div>

          <div className="p-3 sm:p-4 bg-red-50 rounded-lg space-y-1 sm:space-y-2">
            <div className="flex items-center gap-2 text-red-600">
              <Droplet className="w-4 h-4" />
              <p className="text-xs sm:text-sm">Blood Type</p>
            </div>
            <p className="font-medium text-sm sm:text-lg pl-6 text-red-700">
              {bloodGroup}
            </p>
          </div>

          <div className="p-3 sm:p-4 bg-gray-50 rounded-lg space-y-1 sm:space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <p className="text-xs sm:text-sm">Phone</p>
            </div>
            <p className="font-medium text-sm sm:text-lg pl-6">
              {user?.phone || "Not provided"}
            </p>
          </div>

          <div className="p-3 sm:p-4 bg-gray-50 rounded-lg space-y-1 sm:space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <p className="text-xs sm:text-sm">Address</p>
            </div>
            <p className="font-medium text-sm sm:text-lg pl-6 break-words">
              {user?.city ? (
                <>
                  {user?.address}, {user?.upazila}, {user?.city}
                </>
              ) : (
                "Not provided"
              )}
            </p>
          </div>

          <div
            className={`p-3 sm:p-4 rounded-lg space-y-1 sm:space-y-2 ${
              eligibilityStatus === "Available" ? "bg-green-50" : "bg-yellow-50"
            }`}
          >
            <div className="flex items-center gap-2 text-gray-600">
              <Activity className="w-4 h-4" />
              <p className="text-xs sm:text-sm">Eligibility Status</p>
            </div>
            <p
              className={`font-medium text-sm sm:text-lg pl-6 ${
                eligibilityStatus === "Available"
                  ? "text-green-700"
                  : "text-yellow-700"
              }`}
            >
              {eligibilityStatus === "Available"
                ? "Available to donate"
                : "Not eligible until next eligible date"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
