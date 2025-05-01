import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const bloodType = searchParams.get("bloodType")
    const city = searchParams.get("city")
    const upazila = searchParams.get("upazila")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build the query
    const query: any = {
      role: "donor",
      eligibility: true,
    }

    if (bloodType) {
      query.bloodType = bloodType
    }

    if (city || upazila) {
      query.location = {}
      if (city) query.location.city = city
      if (upazila) query.location.upazila = upazila
    }

    // Get donors
    const donors = await prisma.user.findMany({
      where: query,
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
          },
        },
      },
      skip,
      take: limit,
    })

    // Get total count
    const total = await prisma.user.count({
      where: query,
    })

    return NextResponse.json({
      donors,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching donors:", error)
    return NextResponse.json({ error: "Failed to fetch donors" }, { status: 500 })
  }
}
