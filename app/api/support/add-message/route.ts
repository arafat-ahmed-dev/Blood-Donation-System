import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { ticketId, userId, message, isStaff } = body

    // Validate required fields
    if (!ticketId || !userId || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create message
    const supportMessage = await prisma.supportMessage.create({
      data: {
        ticketId,
        userId,
        message,
        isStaff: isStaff || false,
        createdAt: new Date(),
      },
    })

    // Update ticket's updated timestamp
    await prisma.supportTicket.update({
      where: {
        id: ticketId,
      },
      data: {
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      data: supportMessage,
    })
  } catch (error) {
    console.error("Error adding support message:", error)
    return NextResponse.json({ success: false, error: "Failed to add support message" }, { status: 500 })
  }
}
