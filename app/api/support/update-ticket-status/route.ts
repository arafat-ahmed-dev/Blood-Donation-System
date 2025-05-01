import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { ticketId, status } = body

    // Validate required fields
    if (!ticketId || !status) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Validate status
    const validStatuses = ["Open", "In Progress", "Resolved", "Closed"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 })
    }

    // Update ticket status
    const ticket = await prisma.supportTicket.update({
      where: {
        id: ticketId,
      },
      data: {
        status,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      data: ticket,
    })
  } catch (error) {
    console.error("Error updating ticket status:", error)
    return NextResponse.json({ success: false, error: "Failed to update ticket status" }, { status: 500 })
  }
}
