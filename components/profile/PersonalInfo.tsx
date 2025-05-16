import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PersonalInfoProps {
    user: any
    fullName: string
    bloodGroup: string
    eligibilityStatus: string
    setActiveTab: (tab: string) => void
}

export function PersonalInfo({ user, fullName, bloodGroup, eligibilityStatus, setActiveTab }: PersonalInfoProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Your basic information and contact details</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("settings")}>
                        Edit Profile
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{fullName}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user?.email}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Blood Type</p>
                        <p className="font-medium">{bloodGroup}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{user?.phone || "Not provided"}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">
                            {user?.city ? (
                                <>
                                    {user?.address}, {user?.upazila}, {user?.city}
                                </>
                            ) : (
                                "Not provided"
                            )}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Eligibility Status</p>
                        <p className={`font-medium ${eligibilityStatus === "Available" ? "text-green-600" : "text-red-600"}`}>
                            {eligibilityStatus === "Available" ? "Available to donate" : "Not eligible until next eligible date"}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
