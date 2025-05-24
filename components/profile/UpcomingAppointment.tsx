import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

interface Appointment {
  id: string;
  date: string;
  time: string;
  location: string;
  status: string;
}

interface UpcomingAppointmentProps {
  nextAppointment: Appointment | null;
  setActiveTab: (tab: string) => void;
  isLoading?: boolean;
}

export function UpcomingAppointment({
  nextAppointment,
  setActiveTab,
}: UpcomingAppointmentProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Upcoming Appointment</CardTitle>
          <Button
            variant="link"
            className="text-primary p-0 h-auto"
            onClick={() => setActiveTab("appointments")}
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {nextAppointment ? (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{nextAppointment.location}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(nextAppointment.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{nextAppointment.time}</span>
                </div>
              </div>
              <Badge className="bg-green-600">{nextAppointment.status}</Badge>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              No upcoming appointments
            </p>
            <Button>Schedule Now</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
