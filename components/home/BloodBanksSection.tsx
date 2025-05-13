import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Droplet, MapPin, Phone, Clock, ArrowRight } from "lucide-react"

const BLOOD_BANKS_DATA = [
    {
        name: "Dhaka Medical College Blood Bank",
        address: "Dhaka Medical College Hospital, Dhaka",
        phone: "+880 1712-345678",
        hours: "24/7",
    },
    {
        name: "Bangladesh Red Crescent Blood Bank",
        address: "7/5 Aurangzeb Road, Mohammadpur, Dhaka",
        phone: "+880 1812-345678",
        hours: "9 AM - 5 PM",
    },
    {
        name: "Sandhani Blood Bank",
        address: "Central Road, Dhanmondi, Dhaka",
        phone: "+880 1912-345678",
        hours: "8 AM - 8 PM",
    },
]

export function BloodBanksSection() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                            <Droplet className="h-6 w-6 text-red-600" />
                            Blood Banks
                        </h2>
                        <p className="text-muted-foreground">Find blood banks and check inventory levels</p>
                    </div>
                    <Link href="/blood-bank" className="flex items-center text-red-600 hover:underline mt-4 md:mt-0">
                        View All Blood Banks <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BLOOD_BANKS_DATA.map((bank, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-2">{bank.name}</h3>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 flex-shrink-0" />
                                        <span>{bank.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 flex-shrink-0" />
                                        <span>{bank.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 flex-shrink-0" />
                                        <span>Hours: {bank.hours}</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t">
                                    <Button variant="outline" className="w-full">
                                        View Details
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
