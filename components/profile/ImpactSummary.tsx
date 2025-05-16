import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Shield, MapPin } from "lucide-react"

interface ImpactSummaryProps {
    donationCount: number
    user: any
}

export function ImpactSummary({ donationCount, user }: ImpactSummaryProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Impact Summary</CardTitle>
                <CardDescription>The difference your donations have made</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 bg-primary/5 rounded-lg">
                        <Droplet className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold">{donationCount}</p>
                        <p className="text-sm text-muted-foreground">Total Donations</p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                        <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold">Up to {donationCount * 3}</p>
                        <p className="text-sm text-muted-foreground">Lives Potentially Saved</p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                        <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold">{user?.city || "N/A"}</p>
                        <p className="text-sm text-muted-foreground">Community Served</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
