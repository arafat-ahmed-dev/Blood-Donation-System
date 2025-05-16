import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProfileSidebarProps {
    user: any
    eligibilityStatus: string
    fullName: string
    initials: string
    bloodGroup: string
}

export function ProfileSidebar({ user, eligibilityStatus, fullName, initials, bloodGroup }: ProfileSidebarProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                        {user?.image ? (
                            <Image src={user?.image || "/placeholder.svg"} alt={fullName} fill className="object-cover" />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-2xl font-bold text-primary">{initials}</span>
                            </div>
                        )}
                    </div>
                    <h2 className="text-xl font-bold">{fullName}</h2>
                    <p className="text-muted-foreground">Donor ID: {user?.id.substring(0, 8)}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                        <Badge className="bg-primary">{bloodGroup}</Badge>
                        <Badge variant="outline">{eligibilityStatus !== "Not Available" ? "Available" : "Not Available"}</Badge>
                    </div>
                    <div className="w-full mt-4">
                        <Button className="w-full" disabled={eligibilityStatus === "Not Available"}>
                            Schedule Donation
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
