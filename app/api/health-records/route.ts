import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    const healthRecords = await prisma.healthRecord.findMany({
      where: { donorId: userId },
      orderBy: { date: "desc" },
    })

    // Format the data for the frontend
    const formattedRecords = healthRecords.map((record) => ({
      id: record.id,
      date: record.date.toLocaleDateString(),
      hemoglobin: record.hemoglobin,
      bloodPressure: record.bloodPressure,
      pulse: record.pulse,
      weight: record.weight,
      notes: record.notes,
    }))

    return NextResponse.json({
      success: true,
      data: formattedRecords,
    })
  } catch (error) {
    console.error("Error fetching health records:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch health records" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { donorId, hemoglobin, bloodPressure, pulse, weight, notes } = data

    // Validate required fields
    if (!donorId || !hemoglobin || !bloodPressure || !pulse || !weight) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create the health record
    const healthRecord = await prisma.healthRecord.create({
      data: {
        donorId,
        date: new Date(),
        hemoglobin,
        bloodPressure,
        pulse,
        weight,
        notes: notes || "",
      },
    })

    return NextResponse.json({
      success: true,
      data: healthRecord,
    })
  } catch (error) {
    console.error("Error creating health record:", error)
    return NextResponse.json({ success: false, error: "Failed to create health record" }, { status: 500 })
  }
}
