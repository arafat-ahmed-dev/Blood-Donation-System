import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DONATION_HISTORY = [
    {
        date: "2025-01-15",
        recipient: "Rahim Miah",
        location: "Banani, Dhaka",
        bloodGroup: "A+",
    },
    {
        date: "2024-10-10",
        recipient: "Fatima Ahmed",
        location: "Gulshan, Dhaka",
        bloodGroup: "AB+",
    },
    {
        date: "2024-06-05",
        recipient: "Kamal Uddin",
        location: "Mohammadpur, Dhaka",
        bloodGroup: "B-",
    },
];

export default function UserDashboard() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-4xl font-extrabold mb-4">My Donation History</h2>
                    <p className="text-lg text-muted-foreground">
                        Track your past blood donations and the lives you've impacted.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {DONATION_HISTORY.map((donation, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="font-bold text-xl text-primary">{donation.date}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Recipient: {donation.recipient}</p>
                                <p className="text-sm text-muted-foreground">Location: {donation.location}</p>
                                <p className="text-sm text-primary font-medium mt-2">Blood Group: {donation.bloodGroup}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}