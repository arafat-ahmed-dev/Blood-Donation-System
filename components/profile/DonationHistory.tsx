import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Droplet,
  Calendar,
  MapPin,
  Activity,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import Image from "next/image";

interface DonationHistoryProps {
  donations: any[];
  donationsLoading: boolean;
}

export function DonationHistory({
  donations,
  donationsLoading,
}: DonationHistoryProps) {
  const getStatusBadge = (status: string) => {
    const baseClasses =
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Completed":
        return (
          <div
            className={`${baseClasses} bg-green-50 text-green-700 border border-green-200/50`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {status}
          </div>
        );
      case "In Progress":
        return (
          <div
            className={`${baseClasses} bg-yellow-50 text-yellow-700 border border-yellow-200/50`}
          >
            <Clock3 className="w-3.5 h-3.5" />
            {status}
          </div>
        );
      default:
        return (
          <div
            className={`${baseClasses} bg-gray-50 text-gray-700 border border-gray-200/50`}
          >
            {status}
          </div>
        );
    }
  };

  return (
    <Card className="overflow-hidden border">
      <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <Droplet className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-xl">Donation History</CardTitle>
              <CardDescription className="text-sm">
                Your journey of saving lives
              </CardDescription>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/images/donation-icon.png"
              alt="Donation Icon"
              width={60}
              height={60}
              className="opacity-80"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {donationsLoading ? (
          <div className="text-center py-8">
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-muted-foreground">
              Loading your donation history...
            </p>
          </div>
        ) : donations && donations.length > 0 ? (
          <div className="space-y-3">
            {donations.map((donation: any) => (
              <div
                key={donation.id}
                className="bg-white rounded-lg p-3 border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">
                        {new Date(donation.donationDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{donation.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center">
                          <Droplet className="w-4 h-4 text-red-500" />
                        </div>
                        <span className="font-medium text-sm">
                          {donation.bloodType}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                          <Activity className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className="text-sm">{donation.units} units</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center md:justify-end">
                    {getStatusBadge(donation.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Image
              src="/images/empty-donations.png"
              alt="No donations"
              width={80}
              height={80}
              className="mx-auto mb-3 opacity-60"
            />
            <p className="text-base text-muted-foreground">
              No donation history found
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Start your journey of saving lives by scheduling your first
              donation
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
