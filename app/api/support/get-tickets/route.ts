import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    // Build query filters
    const filters: any = {}

    if (userId) {
      filters.userId = userId
    }

    if (status) {
      filters.status = status
    }

    // Get tickets with pagination
    const tickets = await prisma.supportTicket.findMany({
      where: filters,
      include: {
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      skip,
      take: limit,
    })

    // Get total count for pagination
    const totalCount = await prisma.supportTicket.count({
      where: filters,
    })

    return NextResponse.json({
      success: true,
      data: {
        tickets,
        pagination: {
          total: totalCount,
          pages: Math.ceil(totalCount / limit),
          currentPage: page,
          limit,
        },
      },
    })
  } catch (error) {
    console.error("Error fetching support tickets:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch support tickets" }, { status: 500 })
  }
}
