import Link from "next/link"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 relative">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <Heart className="h-16 w-16 mx-auto mb-6 text-white opacity-80" />

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Become a Blood Donor Today
          </h2>

          <p className="text-lg md:text-xl mb-8 opacity-90">
            Your donation can save up to three lives. Join thousands of donors across Bangladesh
            and help people in need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 hover:text-primary"
              asChild
            >
              <Link href="/donor/register">Register as a Donor</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-white border-white/30 hover:bg-white/10"
              asChild
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
