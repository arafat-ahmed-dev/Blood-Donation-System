import { Search, Phone, Heart } from "lucide-react"

const STEPS = [
    {
        icon: <Search className="h-8 w-8 text-red-600" />,
        title: "Find Donors",
        description: "Search for blood donors based on blood type, location, and availability.",
    },
    {
        icon: <Phone className="h-8 w-8 text-red-600" />,
        title: "Connect",
        description: "Contact donors directly through our secure messaging system.",
    },
    {
        icon: <Heart className="h-8 w-8 text-red-600" />,
        title: "Save Lives",
        description: "Arrange donation and help save lives in your community.",
    },
]

export function HowItWorksSection() {
    return (
        <section className="py-16 bg-background">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Rokto Shetu connects blood donors with those in need through a simple process
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {STEPS.map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
