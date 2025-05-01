import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build the query
    const query: any = {}

    if (city) {
      query.city = city
    }

    // Get blood banks
    const bloodBanks = await prisma.bloodBank.findMany({
      where: query,
      orderBy: {
        name: "asc",
      },
      skip,
      take: limit,
    })

    // Get total count
    const total = await prisma.bloodBank.count({
      where: query,
    })

    return NextResponse.json({
      bloodBanks,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching blood banks:", error)
    return NextResponse.json({ error: "Failed to fetch blood banks" }, { status: 500 })
  }
}
