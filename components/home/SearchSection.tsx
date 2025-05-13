import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

export function SearchSection() {
    return (
        <section className="py-12 bg-background">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">Find Blood Donors</h2>
                        <p className="text-muted-foreground">Search for donors by blood group and location</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="md:col-span-3">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Blood Group</label>
                                        <select className="w-full p-2 border rounded-md">
                                            <option value="">Any Blood Group</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">City</label>
                                        <select className="w-full p-2 border rounded-md">
                                            <option value="">Any City</option>
                                            <option value="dhaka">Dhaka</option>
                                            <option value="chittagong">Chittagong</option>
                                            <option value="sylhet">Sylhet</option>
                                            <option value="khulna">Khulna</option>
                                        </select>
                                    </div>

                                    <div className="flex items-end">
                                        <Button className="w-full" size="lg" asChild>
                                            <Link href="/donor/search">
                                                <Search className="mr-2 h-4 w-4" />
                                                Search Donors
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
