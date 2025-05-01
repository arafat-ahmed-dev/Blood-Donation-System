import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    // Get donor information
    const donor = await prisma.donor.findUnique({
      where: { id: userId },
      include: {
        donations: {
          where: { status: "Completed" },
        },
      },
    })

    if (!donor) {
      return NextResponse.json({ success: false, error: "Donor not found" }, { status: 404 })
    }

    // Calculate achievements
    const achievements = [
      {
        name: "First Time Donor",
        description: "Completed your first blood donation",
        icon: "Droplet",
        unlocked: donor.donations.length > 0,
        date:
          donor.donations.length > 0 ? donor.donations[donor.donations.length - 1].donationDate.toISOString() : null,
        progress: donor.donations.length > 0 ? 100 : 0,
      },
      {
        name: "Regular Donor",
        description: "Donated blood 5 times",
        icon: "Heart",
        unlocked: donor.totalDonations >= 5,
        date: donor.totalDonations >= 5 ? donor.lastDonationDate?.toISOString() : null,
        progress: Math.min((donor.totalDonations / 5) * 100, 100),
      },
      {
        name: "Lifesaver",
        description: "Potentially saved up to 15 lives through donations",
        icon: "Shield",
        unlocked: donor.totalDonations >= 5,
        date: donor.totalDonations >= 5 ? donor.lastDonationDate?.toISOString() : null,
        progress: Math.min(((donor.totalDonations * 3) / 15) * 100, 100),
      },
      {
        name: "Blood Type Champion",
        description: "Donated a critical blood type when in high demand",
        icon: "Award",
        unlocked: false, // This would require more complex logic
        date: null,
        progress: 0,
      },
      {
        name: "Donation Streak",
        description: "Donated blood consistently for 1 year",
        icon: "CheckCircle",
        unlocked: false, // This would require more complex logic
        date: null,
        progress: 0,
      },
    ]

    return NextResponse.json({
      success: true,
      data: achievements,
    })
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch achievements" }, { status: 500 })
  }
}
