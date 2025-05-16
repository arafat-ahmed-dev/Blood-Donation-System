import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Droplet } from "lucide-react"

interface RecentDonationsProps {
    donations: any[]
    setActiveTab: (tab: string) => void
}

export function RecentDonations({ donations, setActiveTab }: RecentDonationsProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle>Recent Donations</CardTitle>
                    <Button variant="link" className="text-primary p-0 h-auto" onClick={() => setActiveTab("donations")}>
                        View All
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {donations && donations.length > 0 ? (
                    <div className="space-y-4">
                        {donations.slice(0, 2).map((donation: any) => (
                            <div key={donation.id} className="flex items-start gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                                    <Droplet className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{donation.location}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(donation.donationDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Droplet className="h-4 w-4" />
                                        <span>{donation.units} unit</span>
                                    </div>
                                </div>
                                <Badge className="bg-green-600">{donation.status}</Badge>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-muted-foreground">No donation history yet</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
