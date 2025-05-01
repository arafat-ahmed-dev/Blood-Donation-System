import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, subject, message, category, priority } = body

    // Validate required fields
    if (!userId || !subject || !message || !category) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create support ticket
    const ticket = await prisma.supportTicket.create({
      data: {
        userId,
        subject,
        message,
        category,
        priority: priority || "Medium",
        status: "Open",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Create initial message in the ticket
    await prisma.supportMessage.create({
      data: {
        ticketId: ticket.id,
        userId,
        message,
        isStaff: false,
        createdAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      data: ticket,
    })
  } catch (error) {
    console.error("Error creating support ticket:", error)
    return NextResponse.json({ success: false, error: "Failed to create support ticket" }, { status: 500 })
  }
}
