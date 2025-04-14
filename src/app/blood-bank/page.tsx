import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BLOOD_BANKS = [
    {
        name: "Dhaka Blood Bank",
        location: "Dhaka, Bangladesh",
        contact: "+880 1234-567890",
    },
    {
        name: "Chittagong Blood Center",
        location: "Chittagong, Bangladesh",
        contact: "+880 9876-543210",
    },
    {
        name: "Sylhet Blood Donation Center",
        location: "Sylhet, Bangladesh",
        contact: "+880 1122-334455",
    },
];

export default function BloodBankDirectory() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-4xl font-extrabold mb-4">Blood Bank Directory</h2>
                    <p className="text-lg text-muted-foreground">
                        Find blood banks near you with their contact information.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOOD_BANKS.map((bank, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="font-bold text-xl text-primary">{bank.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{bank.location}</p>
                                <p className="text-sm text-primary font-medium mt-2">{bank.contact}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}