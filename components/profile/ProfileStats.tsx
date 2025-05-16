import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProfileStatsProps {
    donationCount: number
    user: any
}

export function ProfileStats({ donationCount, user }: ProfileStatsProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Donation Status</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Total Donations</span>
                            <span className="font-medium">{donationCount}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Lives Saved</span>
                            <span className="font-medium">Up to {donationCount * 3}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Last Donation</span>
                            <span className="font-medium">
                                {user?.lastDonationDate
                                    ? new Date(user?.lastDonationDate).toLocaleDateString()
                                    : "No donations yet"}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Next Eligible Date</span>
                            <span className="font-medium text-green-600">
                                {user?.nextEligibleDate ? new Date(user.nextEligibleDate).toLocaleDateString() : "Available now"}
                            </span>
                        </div>
                    </div>
                    <div className="pt-2 border-t">
                        <div className="flex justify-between text-sm mb-1">
                            <span>Donor Level</span>
                            <span className="font-medium">
                                {donationCount >= 10 ? "Gold" : donationCount >= 5 ? "Silver" : "Bronze"}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span>
                                    Progress to {donationCount >= 10 ? "Platinum" : donationCount >= 5 ? "Gold" : "Silver"}
                                </span>
                                <span>
                                    {donationCount}/{donationCount >= 10 ? "20" : donationCount >= 5 ? "10" : "5"} donations
                                </span>
                            </div>
                            <Progress
                                value={
                                    donationCount >= 10
                                        ? (donationCount / 20) * 100
                                        : donationCount >= 5
                                            ? (donationCount / 10) * 100
                                            : (donationCount / 5) * 100
                                }
                                className="h-2"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
