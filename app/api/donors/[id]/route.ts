import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const donor = await prisma.user.findUnique({
      where: {
        id,
        role: "donor",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        bloodType: true,
        eligibility: true,
        nextEligibleDate: true,
        location: {
          select: {
            address: true,
            city: true,
            upazila: true,
          },
        },
        donations: {
          select: {
            id: true,
            donationDate: true,
            location: true,
            status: true,
          },
          orderBy: {
            donationDate: "desc",
          },
        },
      },
    })

    if (!donor) {
      return NextResponse.json({ error: "Donor not found" }, { status: 404 })
    }

    return NextResponse.json({ donor })
  } catch (error) {
    console.error("Error fetching donor:", error)
    return NextResponse.json({ error: "Failed to fetch donor" }, { status: 500 })
  }
}
