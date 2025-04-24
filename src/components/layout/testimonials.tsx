"use client"

import { Quote } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Sample testimonials data
const TESTIMONIALS = [
  {
    id: 1,
    name: "Tariq Khan",
    role: "Blood Recipient",
    quote: "I needed blood urgently after an accident. Within an hour of posting on Rokto, three donors contacted me. This platform literally saved my life.",
    image: "/testimonials/testimonial-1.jpg"
  },
  {
    id: 2,
    name: "Farida Rahman",
    role: "Regular Donor",
    quote: "Being a blood donor gives me immense satisfaction. Rokto Shetu makes it easy to connect with people who need blood, and the process is very smooth.",
    image: "/testimonials/testimonial-2.jpg"
  },
  {
    id: 3,
    name: "Dr. Alam Chowdhury",
    role: "Medical Professional",
    quote: "As a doctor, I've seen how critical timely blood donations can be. Rokto Shetu has become an essential tool for us to find donors quickly in emergency situations.",
    image: "/testimonials/testimonial-3.jpg"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
          <p className="text-lg text-muted-foreground">
            Hear from donors and recipients who have used Rokto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  testimonial: typeof TESTIMONIALS[0]
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 pb-4 flex-grow">
        <div className="mb-4">
          <Quote className="h-8 w-8 text-primary opacity-50" />
        </div>
        <blockquote className="text-lg mb-4">
          "{testimonial.quote}"
        </blockquote>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-medium text-sm">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h4 className="font-medium">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
