import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Droplet, Shield, MapPin, Heart, Users, Trophy } from "lucide-react";

interface ImpactSummaryProps {
  donationCount: number;
  user: any;
}

export function ImpactSummary({ donationCount, user }: ImpactSummaryProps) {
  return (
    <Card className="border-2">
      <CardHeader className="bg-gradient-to-r from-rose-50 to-red-50 border-b p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-100 flex items-center justify-center">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
          </div>
          <div>
            <CardTitle className="text-xl sm:text-2xl">
              Impact Summary
            </CardTitle>
            <CardDescription className="text-sm">
              The difference your donations have made
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Total Donations */}
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-500/10 transform group-hover:scale-105 transition-transform duration-300 rounded-xl"></div>
            <div className="relative p-4 sm:p-6 bg-white rounded-xl border-2 border-red-100 hover:border-red-200 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-100 flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Droplet className="h-5 h-5 sm:h-6 sm:w-6 text-red-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-red-600 text-center mb-1 sm:mb-2">
                {donationCount}
              </p>
              <p className="text-xs sm:text-sm text-red-600/80 text-center font-medium">
                Total Donations
              </p>
              <p className="text-[10px] sm:text-xs text-red-500/60 text-center mt-1 sm:mt-2">
                Each donation counts!
              </p>
            </div>
          </div>

          {/* Lives Saved */}
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-500/10 transform group-hover:scale-105 transition-transform duration-300 rounded-xl"></div>
            <div className="relative p-4 sm:p-6 bg-white rounded-xl border-2 border-green-100 hover:border-green-200 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Users className="h-5 h-5 sm:h-6 sm:w-6 text-green-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-green-600 text-center mb-1 sm:mb-2">
                Up to {donationCount * 3}
              </p>
              <p className="text-xs sm:text-sm text-green-600/80 text-center font-medium">
                Lives Potentially Saved
              </p>
              <p className="text-[10px] sm:text-xs text-green-500/60 text-center mt-1 sm:mt-2">
                Making a real difference
              </p>
            </div>
          </div>

          {/* Community Impact */}
          <div className="group relative overflow-hidden sm:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/10 transform group-hover:scale-105 transition-transform duration-300 rounded-xl"></div>
            <div className="relative p-4 sm:p-6 bg-white rounded-xl border-2 border-blue-100 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Trophy className="h-5 h-5 sm:h-6 sm:w-6 text-blue-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600 text-center mb-1 sm:mb-2">
                {user?.city || "Local"}
              </p>
              <p className="text-xs sm:text-sm text-blue-600/80 text-center font-medium">
                Community Served
              </p>
              <p className="text-[10px] sm:text-xs text-blue-500/60 text-center mt-1 sm:mt-2">
                Supporting your area
              </p>
            </div>
          </div>
        </div>

        {/* Additional Impact Information */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <Shield className="h-4 h-4 sm:h-5 sm:w-5 text-orange-500" />
            <h3 className="font-medium text-sm sm:text-base text-orange-700">
              Your Impact Journey
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-orange-600/80 leading-relaxed">
            Your generous donations have helped strengthen the healthcare system
            in {user?.city || "your community"}. Each donation can save up to 3
            lives, making you a vital part of our life-saving mission.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
