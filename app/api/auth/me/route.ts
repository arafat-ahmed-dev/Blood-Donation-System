import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { verify } from "jsonwebtoken"
import { cookies } from "next/headers"

export async function GET() {
  try {
    // Get the token from cookies
    const token = cookies().get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key") as { id: string }

    // Get the user from the database
    const user = await prisma.donor.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        bloodType: true,
        isAdmin: true,
        image: true,
        donorLevel: true,
        totalDonations: true,
        lastDonationDate: true,
        nextEligibleDate: true,
      },
    })

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ success: false, message: "Authentication failed" }, { status: 401 })
  }
}
