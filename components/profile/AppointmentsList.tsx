import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"

interface AppointmentsListProps {
    appointments: any[]
    appointmentsLoading: boolean
}

export function AppointmentsList({ appointments, appointmentsLoading }: AppointmentsListProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center flex-col md:flex-row gap-5">
                    <div>
                        <CardTitle>Appointments</CardTitle>
                        <CardDescription>Your scheduled donation appointments</CardDescription>
                    </div>
                    <Button>Schedule New Appointment</Button>
                </div>
            </CardHeader>
            <CardContent>
                {appointmentsLoading ? (
                    <div className="text-center py-8">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading appointments...</p>
                    </div>
                ) : appointments && appointments.length > 0 ? (
                    <div className="space-y-4">
                        {appointments.map((appointment: any) => (
                            <div
                                key={appointment.id}
                                className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        <span className="font-medium">{new Date(appointment.date).toLocaleDateString()}</span>
                                        <span className="text-muted-foreground">at</span>
                                        <span className="font-medium">{appointment.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        <span>{appointment.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge
                                            className={
                                                appointment.status === "Confirmed"
                                                    ? "bg-green-600"
                                                    : appointment.status === "Completed"
                                                        ? "bg-blue-600"
                                                        : "bg-yellow-600"
                                            }
                                        >
                                            {appointment.status}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Button variant="outline" size="sm" disabled={appointment.status === "Completed"}>
                                        Reschedule
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                        disabled={appointment.status === "Completed"}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">No appointments found</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
