import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Heart, Users, Calendar, Clock, Award } from "lucide-react";
import { format, isValid } from "date-fns";

interface ProfileStatsProps {
  donationCount: number;
  user: any;
}

export function ProfileStats({ donationCount, user }: ProfileStatsProps) {
  // Calculate values based on donationCount
  const donationsMade = donationCount;
  const livesImpacted = donationCount * 3; // Assuming each donation can help up to 3 people

  // Format dates
  const formatDate = (date: string | Date | null) => {
    if (!date) return "No date available";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return isValid(dateObj) ? format(dateObj, "MMM dd, yyyy") : "Invalid date";
  };

  const lastDonation = formatDate(user.lastDonationDate);
  const nextEligibleDate = formatDate(user.nextEligibleDate);
  const donorLevel = getDonorLevel(donationCount);
  const progressToNext = (donationCount % 20) * 5; // Progress percentage to next level

  function getDonorLevel(count: number): string {
    if (count >= 60) return "Platinum";
    if (count >= 40) return "Gold";
    if (count >= 20) return "Silver";
    return "Bronze";
  }

  return (
    <Card className="p-4">
      {/* Donation Status Section */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 text-lg font-semibold">
          <TrendingUp className="w-5 h-5 text-purple-500" />
          <span>Donation Status</span>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-red-50/50 rounded-lg">
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <Heart className="w-4 h-4" />
              <span className="text-xs font-medium">Total Impact</span>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {donationsMade}
            </div>
            <div className="text-xs text-red-600">Donations Made</div>
          </div>
          <div className="p-3 bg-green-50/50 rounded-lg">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">Lives Impacted</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              Up to {livesImpacted}
            </div>
            <div className="text-xs text-green-600">Lives Saved</div>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-2">
          <div className="p-2.5 bg-blue-50/50 rounded-lg flex items-center gap-3">
            <Calendar className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-xs text-blue-600 font-medium">
                Last Donation
              </div>
              <div className="text-sm">{lastDonation}</div>
            </div>
          </div>
          <div className="p-2.5 bg-green-50/50 rounded-lg flex items-center gap-3">
            <Clock className="w-4 h-4 text-green-500" />
            <div>
              <div className="text-xs text-green-600 font-medium">
                Next Eligible Date
              </div>
              <div className="text-sm">{nextEligibleDate}</div>
            </div>
          </div>
        </div>

        {/* Donor Level */}
        <div className="border rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium">Donor Level</span>
            </div>
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-600 border-amber-200"
            >
              {donorLevel}
            </Badge>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Progress to Platinum</span>
              <span className="font-medium">{donationsMade}/20</span>
            </div>
            <Progress value={progressToNext} className="h-1.5 bg-gray-100" />
          </div>
        </div>
      </div>
    </Card>
  );
}
