import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")
    const bloodType = searchParams.get("bloodType")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build the query
    const query: any = {}

    if (userId) {
      query.requesterId = userId
    }

    if (status) {
      query.status = status
    }

    if (bloodType) {
      query.bloodType = bloodType
    }

    // Get requests
    const requests = await prisma.bloodRequest.findMany({
      where: query,
      include: {
        requester: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    })

    // Get total count
    const total = await prisma.bloodRequest.count({
      where: query,
    })

    return NextResponse.json({
      requests,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching blood requests:", error)
    return NextResponse.json({ error: "Failed to fetch blood requests" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { bloodType, units, urgency, hospital, patientName, contactName, contactPhone, details } = body

    // Validate required fields
    if (!bloodType || !units || !urgency || !hospital || !contactPhone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create the blood request
    const bloodRequest = await prisma.bloodRequest.create({
      data: {
        requesterId: session.user.id,
        bloodType,
        units,
        urgency,
        hospital,
        patientName,
        contactName: contactName || session.user.name,
        contactPhone,
        details,
        status: "Pending",
      },
    })

    // Find eligible donors for notification
    const eligibleDonors = await prisma.user.findMany({
      where: {
        bloodType,
        eligibility: true,
        role: "donor",
      },
      select: {
        id: true,
        email: true,
      },
    })

    // Create notifications for eligible donors
    if (eligibleDonors.length > 0) {
      await prisma.notification.createMany({
        data: eligibleDonors.map((donor) => ({
          userId: donor.id,
          title: "Urgent Blood Request",
          message: `There is an urgent request for ${bloodType} blood at ${hospital}. Please check if you can help.`,
          type: "URGENT",
        })),
      })
    }

    return NextResponse.json({ bloodRequest })
  } catch (error) {
    console.error("Error creating blood request:", error)
    return NextResponse.json({ error: "Failed to create blood request" }, { status: 500 })
  }
}
