import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
    return (
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
    )
}
