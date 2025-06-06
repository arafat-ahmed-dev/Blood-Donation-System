import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Heart, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-primary-foreground border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-8 w-8">
                  {/* Rokto Shetu logo with blood drop */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* <div className="blood-drop-pulse h-5 w-3 bg-primary rounded-b-full rounded-t-[50%]" /> */}
                    <Image
                      src="/logo.svg"
                      alt="Rokto Shetu Logo"
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full" />
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xl font-bold text-primary">
                  Rokto Shetu
                </span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Rokto Shetu is a real-time free platform to help blood searchers connect voluntary blood donors around Bangladesh.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="outline" className="rounded-full h-8 w-8">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-8 w-8">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-8 w-8">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-8 w-8">
                <Youtube className="h-4 w-4" />
                <span className="sr-only">Youtube</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/request" className="text-muted-foreground hover:text-primary">
                  Request Blood
                </Link>
              </li>
              <li>
                <Link href="/donor/search" className="text-muted-foreground hover:text-primary">
                  Find Donors
                </Link>
              </li>
              <li>
                <Link href="/donor/register" className="text-muted-foreground hover:text-primary">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Blood Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/what-is-blood" className="text-muted-foreground hover:text-primary">
                  What is Blood?
                </Link>
              </li>
              <li>
                <Link href="/blood-groups" className="text-muted-foreground hover:text-primary">
                  Blood Groups
                </Link>
              </li>
              <li>
                <Link href="/eligibility" className="text-muted-foreground hover:text-primary">
                  Eligibility
                </Link>
              </li>
              <li>
                <Link href="/donation-process" className="text-muted-foreground hover:text-primary">
                  Donation Process
                </Link>
              </li>
              <li>
                <Link href="/blood-banks" className="text-muted-foreground hover:text-primary">
                  Blood Banks
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-muted-foreground">+880 1234-567890</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-muted-foreground">info@rokto.co</span>
              </li>
            </ul>
            <div className="pt-4">
              <Button className="w-full gap-2">
                <Heart className="h-4 w-4" />
                <span>Donate Now</span>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Rokto Shetu. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
