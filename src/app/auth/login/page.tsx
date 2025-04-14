import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Rokto account to manage your profile, blood donation history, and requests."
}

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-md mx-auto">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>

            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-center mb-2">
                  <div className="relative h-10 w-6">
                    <div className="blood-drop-pulse h-full w-full bg-primary rounded-b-full rounded-t-[50%]" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Log in to Rokto</CardTitle>
                <CardDescription className="text-center">
                  Enter your phone number and password to log in
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <div className="inline-flex h-10 items-center justify-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                      +880
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="1XX XXX XXXX"
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/auth/reset-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" />
                </div>
                <Button className="w-full">Log in</Button>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-center text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/auth/register" className="text-primary hover:underline">
                    Register
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">Google</Button>
                  <Button variant="outline">Facebook</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
