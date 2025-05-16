import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, History, Calendar, Settings } from "lucide-react"

interface QuickLinksProps {
    activeTab: string
    setActiveTab: (tab: string) => void
}

export function QuickLinks({ activeTab, setActiveTab }: QuickLinksProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
                <nav className="space-y-1">
                    <button
                        className={`flex items-center gap-2 p-2 rounded-md text-sm w-full text-left ${activeTab === "overview" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                            }`}
                        onClick={() => setActiveTab("overview")}
                    >
                        <User className="h-4 w-4" />
                        <span>Overview</span>
                    </button>
                    <button
                        className={`flex items-center gap-2 p-2 rounded-md text-sm w-full text-left ${activeTab === "donations" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                            }`}
                        onClick={() => setActiveTab("donations")}
                    >
                        <History className="h-4 w-4" />
                        <span>Donation History</span>
                    </button>
                    <button
                        className={`flex items-center gap-2 p-2 rounded-md text-sm w-full text-left ${activeTab === "appointments" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                            }`}
                        onClick={() => setActiveTab("appointments")}
                    >
                        <Calendar className="h-4 w-4" />
                        <span>Appointments</span>
                    </button>
                    <button
                        className={`flex items-center gap-2 p-2 rounded-md text-sm w-full text-left ${activeTab === "settings" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                            }`}
                        onClick={() => setActiveTab("settings")}
                    >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                    </button>
                </nav>
            </CardContent>
        </Card>
    )
}
