import { Droplet, Users, MapPin, Heart } from "lucide-react"

const STATS_DATA = [
    { icon: <Droplet className="h-10 w-10" />, value: "10,548", label: "Donations Collected" },
    { icon: <Users className="h-10 w-10" />, value: "31,644", label: "Lives Saved" },
    { icon: <MapPin className="h-10 w-10" />, value: "24", label: "Donation Centers" },
    { icon: <Heart className="h-10 w-10" />, value: "4,235", label: "Regular Donors" },
]

export function ImpactStatsSection() {
    return (
        <section className="py-16 bg-red-600 text-white">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
                    <p className="max-w-2xl mx-auto opacity-90">
                        Together, we're making a difference in our community and saving lives through blood donation
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {STATS_DATA.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="flex justify-center mb-4">{stat.icon}</div>
                            <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                            <div className="opacity-90">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
