import Link from "next/link"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-600" />
              <span className="text-xl font-bold">LifeFlow</span>
            </Link>
            <p className="text-sm text-muted-foreground">Connecting donors with those in need since 2024.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blood-bank" className="hover:text-red-600 transition-colors">
                  Blood Bank
                </Link>
              </li>
              <li>
                <Link href="/urgent-request" className="hover:text-red-600 transition-colors">
                  Urgent Requests
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-red-600 transition-colors">
                  Blog & News
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/donation-center" className="hover:text-red-600 transition-colors">
                  Donation Centers
                </Link>
              </li>
              <li>
                <Link href="/blood-education" className="hover:text-red-600 transition-colors">
                  Blood Education
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-red-600 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground">
              <p>123 Donation Street</p>
              <p>Cityville, State 12345</p>
              <p className="mt-2">contact@lifeflow.com</p>
              <p>(123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} LifeFlow Blood Donation System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
