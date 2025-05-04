"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center" aria-label="Main navigation">
      <NavigationMenu>
        <NavigationMenuList className="space-x-0.5 md:space-x-1 lg:space-x-2">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" className="text-[13px] md:text-sm font-medium transition-colors hover:text-primary px-1.5 md:px-2">
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-[13px] md:text-sm font-medium px-1.5 md:px-2">Find Blood</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 p-4 md:p-6 w-[300px] md:w-[400px] md:grid-cols-2" role="menu">
                <li role="menuitem">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/request"
                      className="block select-none space-y-1 rounded-md p-3 hover:bg-accent transition-colors"
                    >
                      <div className="text-sm font-medium leading-none">Request Blood</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Find blood donors near you for emergency needs
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li role="menuitem">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/donor/search"
                      className="block select-none space-y-1 rounded-md p-3 hover:bg-accent transition-colors"
                    >
                      <div className="text-sm font-medium leading-none">Search Donors</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Search by location, blood type, and availability
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="col-span-2" role="menuitem">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/blood-bank"
                      className="block select-none space-y-1 rounded-md p-3 hover:bg-accent transition-colors"
                    >
                      <div className="text-sm font-medium leading-none">Blood Banks</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Find nearby blood banks and check availability
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-[13px] md:text-sm font-medium px-1.5 md:px-2">Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 p-4 md:p-6 w-[300px] md:w-[500px] md:grid-cols-2" role="menu">
                <li role="menuitem">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/become-blood-donor"
                      className="block select-none space-y-1 rounded-md p-3 hover:bg-accent transition-colors"
                    >
                      <div className="text-sm font-medium leading-none">Become a Donor</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Register as a blood donor and help save lives
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li role="menuitem">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/blog"
                      className="block select-none space-y-1 rounded-md p-3 hover:bg-accent transition-colors"
                    >
                      <div className="text-sm font-medium leading-none">Blog & News</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Read latest articles about blood donation
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li role="menuitem">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/donation-centers"
                      className="block select-none space-y-1 rounded-md p-3 hover:bg-accent transition-colors"
                    >
                      <div className="text-sm font-medium leading-none">Donation Centers</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Find active donation centers near you
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li role="menuitem">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/blood-education"
                      className="block select-none space-y-1 rounded-md p-3 hover:bg-accent transition-colors"
                    >
                      <div className="text-sm font-medium leading-none">Blood Education</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Learn about blood types, donation process & more
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/about" className="text-[13px] md:text-sm font-medium transition-colors hover:text-primary px-1.5 md:px-2">
                About
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
