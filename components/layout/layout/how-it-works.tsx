import { UserPlus, Search, Phone, CalendarClock } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Rokto Shetu Works</h2>
          <p className="text-lg text-muted-foreground">
            Rokto Shetu connects blood donors with people in need through a simple process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProcessStep
            icon={<UserPlus className="h-10 w-10 text-primary" />}
            title="Register"
            description="Create an account as a voluntary blood donor with your details"
            step={1}
          />

          <ProcessStep
            icon={<Search className="h-10 w-10 text-primary" />}
            title="Find Donors"
            description="Search for donors by location, blood group or phone number"
            step={2}
          />

          <ProcessStep
            icon={<Phone className="h-10 w-10 text-primary" />}
            title="Contact"
            description="Get in touch with donors directly through the platform"
            step={3}
          />

          <ProcessStep
            icon={<CalendarClock className="h-10 w-10 text-primary" />}
            title="Schedule"
            description="Arrange the donation time and location with the donor"
            step={4}
          />
        </div>
      </div>
    </section>
  )
}

interface ProcessStepProps {
  icon: React.ReactNode
  title: string
  description: string
  step: number
}

function ProcessStep({ icon, title, description, step }: ProcessStepProps) {
  return (
    <div className="donation-step relative">
      {/* Step number */}
      <div className="absolute top-0 right-0 bg-primary text-white text-sm font-medium h-8 w-8 rounded-full flex items-center justify-center transform translate-x-2 -translate-y-2">
        {step}
      </div>

      <div className="mb-4 p-4 bg-primary/10 rounded-full inline-flex">
        {icon}
      </div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
