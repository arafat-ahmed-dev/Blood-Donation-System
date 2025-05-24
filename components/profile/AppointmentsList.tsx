import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  AlertCircle,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import Image from "next/image";

interface AppointmentsListProps {
  appointments: any[];
  appointmentsLoading: boolean;
}

export function AppointmentsList({
  appointments,
  appointmentsLoading,
}: AppointmentsListProps) {
  const getStatusBadge = (status: string) => {
    const baseClasses =
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Confirmed":
        return (
          <div
            className={`${baseClasses} bg-green-50 text-green-700 border border-green-200/50`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {status}
          </div>
        );
      case "Pending":
        return (
          <div
            className={`${baseClasses} bg-yellow-50 text-yellow-700 border border-yellow-200/50`}
          >
            <Clock3 className="w-3.5 h-3.5" />
            {status}
          </div>
        );
      case "Cancelled":
        return (
          <div
            className={`${baseClasses} bg-red-50 text-red-700 border border-red-200/50`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
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
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b p-4">
        <div className="flex justify-between items-center flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-xl">Appointments</CardTitle>
              <CardDescription className="text-sm">
                Manage your donation schedule
              </CardDescription>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 w-full sm:w-auto text-sm h-9">
            <CalendarPlus className="w-4 h-4" />
            Schedule New Appointment
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {appointmentsLoading ? (
          <div className="text-center py-8">
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-muted-foreground">
              Loading your appointments...
            </p>
          </div>
        ) : appointments && appointments.length > 0 ? (
          <div className="space-y-3">
            {appointments.map((appointment: any) => (
              <div
                key={appointment.id}
                className="bg-white rounded-lg p-3 border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-base truncate">
                          {new Date(appointment.date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-0.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 pl-10">
                      <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                      <span className="text-xs text-gray-600 break-words">
                        {appointment.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pl-10">
                      {getStatusBadge(appointment.status)}
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col gap-2 pl-10 sm:pl-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-200 text-blue-700 hover:bg-blue-50 text-xs h-8 px-2.5"
                      disabled={
                        appointment.status === "Completed" ||
                        appointment.status === "Cancelled"
                      }
                    >
                      Reschedule
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-700 hover:bg-red-50 text-xs h-8 px-2.5"
                      disabled={
                        appointment.status === "Completed" ||
                        appointment.status === "Cancelled"
                      }
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Image
              src="/images/empty-appointments.svg"
              alt="No appointments"
              width={80}
              height={80}
              className="mx-auto mb-3 opacity-60"
            />
            <p className="text-base text-muted-foreground">
              No appointments scheduled
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Schedule your next donation appointment to help save lives
            </p>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-sm h-9">
              Schedule Appointment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
