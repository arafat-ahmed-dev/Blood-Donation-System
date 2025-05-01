import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { BookOpen, FileText, Play, Award } from "lucide-react"

export default function BloodEducationPage() {
  const educationalResources = [
    {
      id: 1,
      title: "Understanding Blood Types",
      description: "Learn about the ABO blood group system and Rh factors.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Basic Knowledge",
      level: "Beginner",
    },
    {
      id: 2,
      title: "The Donation Process",
      description: "A step-by-step guide to what happens when you donate blood.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Donation",
      level: "Beginner",
    },
    {
      id: 3,
      title: "Blood Components and Their Uses",
      description: "Discover how different blood components are used in medical treatments.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Medical",
      level: "Intermediate",
    },
    {
      id: 4,
      title: "Eligibility Requirements",
      description: "Find out who can donate blood and the criteria for eligibility.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Donation",
      level: "Beginner",
    },
    {
      id: 5,
      title: "The Science of Blood Storage",
      description: "How blood is processed, stored, and transported to maintain viability.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Technical",
      level: "Advanced",
    },
    {
      id: 6,
      title: "Blood Disorders and Transfusions",
      description: "Understanding common blood disorders and how transfusions help.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Medical",
      level: "Intermediate",
    },
  ]

  const faqs = [
    {
      question: "How often can I donate blood?",
      answer:
        "Most people can donate whole blood every 56 days (8 weeks). If you donate platelets, you can give every 7 days up to 24 times a year. Plasma donors can donate every 28 days, and double red cell donors can give every 112 days.",
    },
    {
      question: "Does donating blood hurt?",
      answer:
        "Most people feel only a slight pinch when the needle is inserted. The actual donation process is relatively painless. Our trained staff work to make the experience as comfortable as possible.",
    },
    {
      question: "How long does a blood donation take?",
      answer:
        "The entire process takes about an hour, though the actual blood donation only takes about 8-10 minutes. The rest of the time is spent on registration, a mini-physical, and a brief rest period with refreshments afterward.",
    },
    {
      question: "Is it safe to donate blood?",
      answer:
        "Yes, it's completely safe. All equipment used is sterile and disposed of after a single use. You cannot contract any disease by donating blood.",
    },
    {
      question: "How much blood is taken during a donation?",
      answer:
        "A typical whole blood donation is approximately one pint (about 500 ml), which is about 10% of the blood in an adult's body. Your body replaces the fluid within 24 hours and the red blood cells within a few weeks.",
    },
    {
      question: "Can I donate if I'm taking medication?",
      answer:
        "It depends on the medication. Many medications are acceptable, but some may require a waiting period after your last dose. It's best to inform the donation center about any medications you're taking.",
    },
    {
      question: "What should I eat before donating blood?",
      answer:
        "Eat a healthy meal within 3 hours before donating. Avoid fatty foods, but make sure to consume foods rich in iron and drink plenty of fluids before and after donation.",
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Blood Education</h1>
        <p className="text-muted-foreground">Learn about blood donation, types, and the importance of giving blood</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="overflow-hidden">
          <div className="relative h-[200px]">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Blood donation education"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Why Your Donation Matters</h2>
              <p className="mb-4">
                One donation can save up to three lives. Learn how your contribution makes a difference.
              </p>
              <Button className="w-fit bg-red-600 hover:bg-red-700">
                <Play className="mr-2 h-4 w-4" /> Watch Video
              </Button>
            </div>
          </div>
        </Card>
        <div className="grid grid-rows-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-red-600" />
                <CardTitle>Become a Blood Donation Expert</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Take our comprehensive courses to learn everything about blood donation and earn certificates.
              </CardDescription>
              <div className="flex gap-2">
                <Button variant="outline">View Courses</Button>
                <Button className="bg-red-600 hover:bg-red-700">Get Started</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-600" />
                <CardTitle>Download Resources</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Access our library of educational materials, infographics, and guides about blood donation.
              </CardDescription>
              <Button variant="outline" className="w-full">
                Browse Resources
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="resources" className="mb-8">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="resources">Educational Resources</TabsTrigger>
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
        </TabsList>
        <TabsContent value="resources" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {educationalResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden">
                <div className="relative h-40">
                  <Image
                    src={resource.image || "/placeholder.svg"}
                    alt={resource.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <Badge variant="outline">{resource.category}</Badge>
                    <Badge variant="secondary">{resource.level}</Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <CardDescription>{resource.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-red-600">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Common Questions About Blood Donation</CardTitle>
              <CardDescription>Find answers to frequently asked questions about donating blood</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">Don't see your question? Contact us for more information.</p>
              <Button variant="outline">Contact Support</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-muted rounded-lg p-6 md:p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <BookOpen className="h-10 w-10 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Ready to Learn More?</h2>
          <p className="text-muted-foreground mb-6">
            Our comprehensive blood education program offers courses for everyone from beginners to healthcare
            professionals. Expand your knowledge and become an advocate for blood donation in your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">View All Resources</Button>
            <Button className="bg-red-600 hover:bg-red-700">Enroll in Courses</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
