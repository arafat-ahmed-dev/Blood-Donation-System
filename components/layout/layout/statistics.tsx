import { Users, Droplet, Heart, Award } from "lucide-react"

export function Statistics() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Impact We've Made Together
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            icon={<Users className="h-8 w-8 text-primary" />}
            value="10,250+"
            label="Registered Donors"
          />
          <StatCard
            icon={<Droplet className="h-8 w-8 text-primary" />}
            value="15,420+"
            label="Blood Requests"
          />
          <StatCard
            icon={<Heart className="h-8 w-8 text-primary" />}
            value="8,750+"
            label="Lives Saved"
          />
          <StatCard
            icon={<Award className="h-8 w-8 text-primary" />}
            value="60+"
            label="Districts Covered"
          />
        </div>
      </div>
    </section>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  value: string
  label: string
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border flex flex-col items-center text-center transition-all hover:shadow-md hover:-translate-y-1">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-3xl font-bold mb-2">{value}</h3>
      <p className="text-muted-foreground">{label}</p>
    </div>
  )
}
