import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, ArrowRight } from "lucide-react"

const URGENT_NEEDS_DATA = [
    { type: "O-", level: "Critical", units: "20 units needed", location: "Dhaka Medical College" },
    { type: "B-", level: "Critical", units: "15 units needed", location: "Chittagong General Hospital" },
    { type: "AB-", level: "Low", units: "10 units needed", location: "Sylhet Medical Center" },
    { type: "A+", level: "Low", units: "25 units needed", location: "Khulna City Hospital" },
]

export function UrgentNeedsSection() {
    return (
        <section className="py-12 bg-red-50">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                            <Heart className="h-6 w-6 text-red-600" />
                            Urgent Blood Needs
                        </h2>
                        <p className="text-muted-foreground">Critical blood types currently in high demand</p>
                    </div>
                    <Link href="/request" className="flex items-center text-red-600 hover:underline mt-4 md:mt-0">
                        View All Urgent Requests <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {URGENT_NEEDS_DATA.map((blood) => (
                        <Card
                            key={blood.type}
                            className={`border-l-4 \${blood.level === "Critical" ? "border-l-red-600" : "border-l-amber-500"}`}
                        >
                            <CardHeader className="pb-2">
                                <CardTitle className="text-2xl font-bold">{blood.type}</CardTitle>
                                <CardDescription>
                                    <Badge className={blood.level === "Critical" ? "bg-red-600" : "bg-amber-500"}>
                                        {blood.level}
                                    </Badge>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                                <p className="text-sm">{blood.units}</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3" /> {blood.location}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                                    Respond
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
