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

    // Get appointments
    const appointments = await prisma.appointment.findMany({
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
        date: "asc",
      },
      skip,
      take: limit,
    })

    // Get total count
    const total = await prisma.appointment.count({
      where: query,
    })

    return NextResponse.json({
      appointments,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { donorId, date, time, location } = body

    // Validate required fields
    if (!donorId || !date || !time || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        donorId,
        date: new Date(date),
        time,
        location,
        status: "Confirmed",
      },
    })

    // Create notification for the donor
    await prisma.notification.create({
      data: {
        userId: donorId,
        title: "Appointment Scheduled",
        message: `Your appointment has been scheduled for ${new Date(date).toLocaleDateString()} at ${time} at ${location}.`,
        type: "APPOINTMENT",
      },
    })

    return NextResponse.json({ appointment })
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
  }
}
