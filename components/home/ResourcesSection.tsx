import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Newspaper, Calendar } from "lucide-react"

export function ResourcesSection() {
    return (
        <section className="py-16 bg-background">
            <div className="container">
                <Tabs defaultValue="education" className="w-full">
                    <TabsList className="grid w-full md:w-[600px] grid-cols-3 mx-auto mb-8">
                        <TabsTrigger value="education">Blood Education</TabsTrigger>
                        <TabsTrigger value="blog">Blog & News</TabsTrigger>
                        <TabsTrigger value="events">Upcoming Events</TabsTrigger>
                    </TabsList>

                    <TabsContent value="education">
                        <EducationTab />
                    </TabsContent>

                    <TabsContent value="blog">
                        <BlogTab />
                    </TabsContent>

                    <TabsContent value="events">
                        <EventsTab />
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

function EducationTab() {
    return (
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-red-600" />
                    Learn About Blood Donation
                </h3>
                <p className="text-muted-foreground mb-6">
                    Explore our educational resources to learn about blood types, donation processes, and how your
                    contribution saves lives.
                </p>
                <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                        <Badge className="bg-green-600">Beginner</Badge>
                        <span>Understanding Blood Types</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Badge className="bg-amber-500">Intermediate</Badge>
                        <span>The Donation Process Explained</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Badge className="bg-blue-600">Advanced</Badge>
                        <span>Blood Components and Their Uses</span>
                    </li>
                </ul>
                <Link href="/education">
                    <Button className="bg-red-600 hover:bg-red-700">Explore Resources</Button>
                </Link>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop"
                    alt="Blood education"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    )
}

function BlogTab() {
    const articles = [
        { title: "New Research Shows Benefits of Regular Blood Donation", date: "April 15, 2024" },
        { title: "Local Hospital Celebrates 10,000th Blood Donor", date: "April 10, 2024" },
        { title: "Blood Donation Awareness Month Kicks Off Next Week", date: "April 5, 2024" },
    ]

    return (
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop"
                    alt="Blog and news"
                    fill
                    className="object-cover"
                />
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-red-600" />
                    Latest News & Articles
                </h3>
                <p className="text-muted-foreground mb-6">
                    Stay informed with the latest news, research, and stories from our blood donation community.
                </p>
                <div className="space-y-4 mb-6">
                    {articles.map((article, index) => (
                        <div key={index} className="border-b pb-2">
                            <h4 className="font-medium">{article.title}</h4>
                            <p className="text-sm text-muted-foreground">{article.date}</p>
                        </div>
                    ))}
                </div>
                <Link href="/blog">
                    <Button className="bg-red-600 hover:bg-red-700">Read Our Blog</Button>
                </Link>
            </div>
        </div>
    )
}

function EventsTab() {
    const events = [
        {
            title: "Community Center Blood Drive",
            location: "Dhanmondi Community Center",
            date: "May 5, 2024",
        },
        {
            title: "University Campus Drive",
            location: "Dhaka University Student Union",
            date: "May 10, 2024",
        },
        {
            title: "Corporate Donation Day",
            location: "Tech Company Headquarters",
            date: "May 15, 2024",
        },
    ]

    return (
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-red-600" />
                    Upcoming Blood Drives
                </h3>
                <p className="text-muted-foreground mb-6">
                    Find and register for upcoming blood donation drives and events in your community.
                </p>
                <div className="space-y-4 mb-6">
                    {events.map((event, index) => (
                        <Card key={index} className="p-4">
                            <h4 className="font-medium">{event.title}</h4>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{event.location}</span>
                                <span className="font-medium">{event.date}</span>
                            </div>
                        </Card>
                    ))}
                </div>
                <Link href="/donation-centers">
                    <Button className="bg-red-600 hover:bg-red-700">View All Events</Button>
                </Link>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1559002449-25214864de57?q=80&w=800&auto=format&fit=crop"
                    alt="Blood donation events"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    )
}
