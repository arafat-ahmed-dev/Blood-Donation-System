import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Droplet,
  Heart,
  MapPin,
  Calendar,
  ArrowRight,
  Users,
  BookOpen,
  Newspaper,
  Search,
  Phone,
  Clock,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-800/90 z-10" />
          <div className="relative h-[500px] md:h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1615461066841-6116e61882b6?q=80&w=1200&auto=format&fit=crop"
              alt="Blood donation"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container">
              <div className="max-w-xl text-white">
                <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                  Saving Lives Together
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Every Drop Counts, Every Donor Matters
                </h1>
                <p className="text-lg md:text-xl mb-6 text-white/90">
                  Join our community of lifesavers. Your blood donation can save up to three lives.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-white/90" asChild>
                    <Link href="/become-blood-donor">Become a Donor</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                    <Link href="/donor/search">Find Donors</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
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

        {/* Urgent Needs Section */}
        <section className="py-12 bg-red-50">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                  <Heart className="h-6 w-6 text-red-600" />
                  Urgent Blood Needs
                </h2>
                <p className="text-muted-foreground">Critical blood types currently in high demand</p>
              </div>
              <Link href="/request" className="flex items-center text-red-600 hover:underline mt-4 md:mt-0">
                View All Urgent Requests <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { type: "O-", level: "Critical", units: "20 units needed", location: "Dhaka Medical College" },
                { type: "B-", level: "Critical", units: "15 units needed", location: "Chittagong General Hospital" },
                { type: "AB-", level: "Low", units: "10 units needed", location: "Sylhet Medical Center" },
                { type: "A+", level: "Low", units: "25 units needed", location: "Khulna City Hospital" },
              ].map((blood) => (
                <Card
                  key={blood.type}
                  className={`border-l-4 ${blood.level === "Critical" ? "border-l-red-600" : "border-l-amber-500"}`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold">{blood.type}</CardTitle>
                    <CardDescription>
                      <Badge className={blood.level === "Critical" ? "bg-red-600" : "bg-amber-500"}>
                        {blood.level}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">{blood.units}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" /> {blood.location}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                      Respond
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Rokto Shetu connects blood donors with those in need through a simple process
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Find Donors</h3>
                <p className="text-muted-foreground">
                  Search for blood donors based on blood type, location, and availability.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Connect</h3>
                <p className="text-muted-foreground">Contact donors directly through our secure messaging system.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Save Lives</h3>
                <p className="text-muted-foreground">Arrange donation and help save lives in your community.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Blood Banks Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                  <Droplet className="h-6 w-6 text-red-600" />
                  Blood Banks
                </h2>
                <p className="text-muted-foreground">Find blood banks and check inventory levels</p>
              </div>
              <Link href="/blood-bank" className="flex items-center text-red-600 hover:underline mt-4 md:mt-0">
                View All Blood Banks <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Dhaka Medical College Blood Bank",
                  address: "Dhaka Medical College Hospital, Dhaka",
                  phone: "+880 1712-345678",
                  hours: "24/7",
                },
                {
                  name: "Bangladesh Red Crescent Blood Bank",
                  address: "7/5 Aurangzeb Road, Mohammadpur, Dhaka",
                  phone: "+880 1812-345678",
                  hours: "9 AM - 5 PM",
                },
                {
                  name: "Sandhani Blood Bank",
                  address: "Central Road, Dhanmondi, Dhaka",
                  phone: "+880 1912-345678",
                  hours: "8 AM - 8 PM",
                },
              ].map((bank, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{bank.name}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span>{bank.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span>{bank.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span>Hours: {bank.hours}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <Tabs defaultValue="education" className="w-full">
              <TabsList className="grid w-full md:w-[600px] grid-cols-3 mx-auto mb-8">
                <TabsTrigger value="education">Blood Education</TabsTrigger>
                <TabsTrigger value="blog">Blog & News</TabsTrigger>
                <TabsTrigger value="events">Upcoming Events</TabsTrigger>
              </TabsList>
              <TabsContent value="education">
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
              </TabsContent>
              <TabsContent value="blog">
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
                      {[
                        { title: "New Research Shows Benefits of Regular Blood Donation", date: "April 15, 2024" },
                        { title: "Local Hospital Celebrates 10,000th Blood Donor", date: "April 10, 2024" },
                        { title: "Blood Donation Awareness Month Kicks Off Next Week", date: "April 5, 2024" },
                      ].map((article, index) => (
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
              </TabsContent>
              <TabsContent value="events">
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
                      {[
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
                      ].map((event, index) => (
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
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="max-w-2xl mx-auto opacity-90">
                Together, we're making a difference in our community and saving lives through blood donation
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <Droplet className="h-10 w-10" />, value: "10,548", label: "Donations Collected" },
                { icon: <Users className="h-10 w-10" />, value: "31,644", label: "Lives Saved" },
                { icon: <MapPin className="h-10 w-10" />, value: "24", label: "Donation Centers" },
                { icon: <Heart className="h-10 w-10" />, value: "4,235", label: "Regular Donors" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
              <p className="text-muted-foreground mb-8">
                Your donation can save up to three lives. Join our community of donors and help us ensure a stable blood
                supply for those in need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
                  <Link href="/become-blood-donor">Become a Donor</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/education">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
