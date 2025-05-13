import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
    return (
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
    )
}
