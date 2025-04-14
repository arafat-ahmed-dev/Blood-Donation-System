import type { Metadata } from "next"
import Link from "next/link"
import { Heart, Users, Award, MessageSquare, User, Building, Calendar, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTA } from "@/components/layout/cta"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Rokto, a real-time free platform to help blood searchers connect voluntary blood donors around Bangladesh."
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <section className="relative bg-gradient-to-r from-red-600 to-red-700 py-16 md:py-24">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Rokto</h1>
              <p className="text-xl opacity-90 mb-8">
                Connecting blood donors with those in need across Bangladesh
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-md flex items-center gap-2">
                  <Users className="h-5 w-5 text-white/80" />
                  <span>10,000+ Donors</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-md flex items-center gap-2">
                  <Award className="h-5 w-5 text-white/80" />
                  <span>Since 2018</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-md flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-white/80" />
                  <span>All of Bangladesh</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                  <p className="text-muted-foreground text-lg">
                    At Rokto, our mission is to bridge the gap between blood donors and recipients,
                    creating a robust network that ensures timely access to blood for everyone in need across Bangladesh.
                  </p>
                  <p className="text-muted-foreground">
                    We believe that no one should suffer due to the unavailability of blood.
                    Through our platform, we aim to create a culture of voluntary blood donation
                    and make the process of finding blood donors quick, easy, and efficient.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Community
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Building a network of donors and recipients across Bangladesh.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Awareness
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Spreading knowledge about the importance of blood donation.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Quick Response
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Ensuring timely blood availability in emergencies.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Excellence
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Maintaining the highest standards in our services.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story section */}
        <section className="py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  How Rokto grew from a small initiative to the largest blood donation network in Bangladesh
                </p>
              </div>

              <div className="space-y-12">
                <div className="relative border-l border-primary/20 pl-8 ml-4">
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">2018: The Beginning</h3>
                  <p className="text-muted-foreground mb-4">
                    Rokto started as a small initiative by a group of university students who witnessed
                    firsthand the challenges of finding blood donors during emergencies.
                  </p>
                </div>

                <div className="relative border-l border-primary/20 pl-8 ml-4">
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">2019: First Digital Platform</h3>
                  <p className="text-muted-foreground mb-4">
                    The launch of our first website and mobile app, connecting hundreds of donors
                    across Dhaka city and facilitating over 1,000 successful donations.
                  </p>
                </div>

                <div className="relative border-l border-primary/20 pl-8 ml-4">
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">2020-2021: Pandemic Response</h3>
                  <p className="text-muted-foreground mb-4">
                    During the COVID-19 pandemic, Rokto expanded its services to include
                    plasma donation from recovered COVID-19 patients, helping save countless lives.
                  </p>
                </div>

                <div className="relative border-l border-primary/20 pl-8 ml-4">
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">2022-Present: Nationwide Network</h3>
                  <p className="text-muted-foreground mb-4">
                    Today, Rokto operates across all 64 districts of Bangladesh, with over 10,000
                    registered donors and partnerships with major hospitals and blood banks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Dedicated individuals working together to make blood donation accessible to all
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <TeamMember
                  name="Karim Rahman"
                  position="Founder & CEO"
                  bio="A software engineer with a vision to revolutionize blood donation in Bangladesh."
                />

                <TeamMember
                  name="Fatima Begum"
                  position="Operations Director"
                  bio="Manages the day-to-day operations and oversees the donor relations team."
                />

                <TeamMember
                  name="Dr. Anisur Haque"
                  position="Medical Advisor"
                  bio="Brings 15 years of experience as a hematologist to ensure medical accuracy."
                />
              </div>

              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-4">
                  Behind the scenes, we have a dedicated team of volunteers, developers,
                  and community managers who make our work possible.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/join-team">Join Our Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section className="py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                  <p className="text-muted-foreground mb-8">
                    Have questions, suggestions, or want to collaborate? We'd love to hear from you!
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Office Address</h3>
                        <p className="text-muted-foreground">
                          Tower Plaza, Level 5<br />
                          42 Gulshan Avenue<br />
                          Dhaka 1212, Bangladesh
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Contact Information</h3>
                        <p className="text-muted-foreground">
                          Email: info@rokto.co<br />
                          Phone: +880 1712-345678<br />
                          Helpline: +880 1812-345678 (24/7)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">We'd Love to Hear From You</h3>
                  <Card>
                    <CardContent className="pt-6">
                      <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                            <input
                              type="text"
                              id="name"
                              className="w-full h-10 px-3 rounded-md border border-input bg-background"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <input
                              type="email"
                              id="email"
                              className="w-full h-10 px-3 rounded-md border border-input bg-background"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                          <input
                            type="text"
                            id="subject"
                            className="w-full h-10 px-3 rounded-md border border-input bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">Message</label>
                          <textarea
                            id="message"
                            className="w-full min-h-[120px] p-3 rounded-md border border-input bg-background resize-none"
                          />
                        </div>
                        <Button className="w-full">Send Message</Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}

interface TeamMemberProps {
  name: string
  position: string
  bio: string
}

function TeamMember({ name, position, bio }: TeamMemberProps) {
  const initials = name.split(' ').map(n => n[0]).join('')

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary">{initials}</span>
          </div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-primary font-medium text-sm mb-3">{position}</p>
          <Separator className="my-3" />
          <p className="text-sm text-muted-foreground">{bio}</p>
        </div>
      </CardContent>
    </Card>
  )
}
