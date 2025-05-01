import Link from "next/link"
import { Heart } from "lucide-react"
import Logo from "./Logo"

export function Footer() {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Connecting blood donors with those in need, saving lives one donation at a time.
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/donor/search" className="text-muted-foreground hover:text-foreground">
                Find Donors
              </Link>
            </li>
            <li>
              <Link href="/request" className="text-muted-foreground hover:text-foreground">
                Request Blood
              </Link>
            </li>
            <li>
              <Link href="/blood-bank" className="text-muted-foreground hover:text-foreground">
                Blood Banks
              </Link>
            </li>
            <li>
              <Link href="/become-blood-donor" className="text-muted-foreground hover:text-foreground">
                Become a Donor
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/education" className="text-muted-foreground hover:text-foreground">
                Blood Education
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                Blog & News
              </Link>
            </li>
            <li>
              <Link href="/donation-centers" className="text-muted-foreground hover:text-foreground">
                Donation Centers
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="text-muted-foreground">123 Blood Donor Street, Dhaka, Bangladesh</li>
            <li>
              <a href="mailto:info@roktoshetu.org" className="text-muted-foreground hover:text-foreground">
                info@roktoshetu.org
              </a>
            </li>
            <li>
              <a href="tel:+8801712345678" className="text-muted-foreground hover:text-foreground">
                +880 171 234 5678
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rokto Shetu. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-3 w-3 fill-primary text-primary" />
              <span>in Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
