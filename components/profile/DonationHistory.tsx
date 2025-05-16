import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DonationHistoryProps {
    donations: any[]
    donationsLoading: boolean
}

export function DonationHistory({ donations, donationsLoading }: DonationHistoryProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Donation History</CardTitle>
                        <CardDescription>Record of all your blood donations</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {donationsLoading ? (
                    <div className="text-center py-8">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading donations...</p>
                    </div>
                ) : donations && donations.length > 0 ? (
                    <div className="rounded-lg border">
                        <div className="grid grid-cols-5 border-b p-4 font-medium">
                            <div>Date</div>
                            <div>Location</div>
                            <div>Blood Type</div>
                            <div>Units</div>
                            <div>Status</div>
                        </div>
                        <div className="divide-y">
                            {donations.map((donation: any) => (
                                <div key={donation.id} className="grid grid-cols-5 p-4 items-center">
                                    <div>{new Date(donation.donationDate).toLocaleDateString()}</div>
                                    <div>{donation.location}</div>
                                    <div>{donation.bloodType}</div>
                                    <div>{donation.units}</div>
                                    <div>
                                        <Badge className="bg-green-600">{donation.status}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">No donation history found</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
