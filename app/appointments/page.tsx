import { AppointmentForm } from "@/components/appointments/appointment-form"
import ClientLayout from "@/components/layout/clientLayout"

export default function AppointmentsPage() {
  return (
    <ClientLayout>
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">Schedule a Donation</h1>
          <p className="text-muted-foreground">Book your next blood donation appointment</p>
        </div>

          <AppointmentForm />
        </div>
      </div>
    </ClientLayout>
  )
}
