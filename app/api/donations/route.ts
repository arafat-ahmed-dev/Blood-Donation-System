import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build the query
    const query: any = {}

    if (userId) {
      query.donorId = userId
    }

    if (status) {
      query.status = status
    }

    // Get donations
    const donations = await prisma.donation.findMany({
      where: query,
      include: {
        donor: {
          select: {
            firstName: true,
            lastName: true,
            bloodType: true,
          },
        },
      },
      orderBy: {
        donationDate: "desc",
      },
      skip,
      take: limit,
    })

    // Get total count
    const total = await prisma.donation.count({
      where: query,
    })

    return NextResponse.json({
      donations,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching donations:", error)
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { donorId, location, bloodType, units, status } = body

    // Validate required fields
    if (!donorId || !location || !bloodType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create the donation
    const donation = await prisma.donation.create({
      data: {
        donorId,
        location,
        bloodType,
        units: units || 1,
        status: status || "Scheduled",
        donationDate: new Date(),
      },
    })

    // Update donor's eligibility if donation is completed
    if (status === "Completed") {
      // Calculate next eligible date (56 days after donation)
      const nextEligibleDate = new Date()
      nextEligibleDate.setDate(nextEligibleDate.getDate() + 56)

      await prisma.user.update({
        where: {
          id: donorId,
        },
        data: {
          eligibility: false,
          nextEligibleDate,
          lastDonationDate: new Date(),
        },
      })

      // Update blood inventory
      const inventory = await prisma.bloodInventory.findUnique({
        where: {
          bloodType,
        },
      })

      if (inventory) {
        await prisma.bloodInventory.update({
          where: {
            bloodType,
          },
          data: {
            units: {
              increment: units || 1,
            },
          },
        })
      } else {
        await prisma.bloodInventory.create({
          data: {
            bloodType,
            units: units || 1,
            status: "Adequate",
          },
        })
      }
    }

    return NextResponse.json({ donation })
  } catch (error) {
    console.error("Error creating donation:", error)
    return NextResponse.json({ error: "Failed to create donation" }, { status: 500 })
  }
}
