import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { predictFutureDonationNeeds } from "@/lib/gemini"

export async function GET(request: Request) {
  try {
    // Get historical data for the past 12 months
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 12)

    // Get all donations for the past 12 months
    const donations = await prisma.donation.findMany({
      where: {
        donationDate: {
          gte: startDate,
        },
        status: "Completed",
      },
      orderBy: {
        donationDate: "asc",
      },
    })

    // Get all blood usage for the past 12 months
    const usageRecords = await prisma.bloodUsage.findMany({
      where: {
        usageDate: {
          gte: startDate,
        },
      },
      include: {
        bloodInventory: {
          select: {
            bloodType: true,
          },
        },
      },
      orderBy: {
        usageDate: "asc",
      },
    })

    // Group donations by month and blood type
    const donationsByMonth: Record<string, Record<string, number>> = {}

    donations.forEach((donation) => {
      const month = new Date(donation.donationDate).toISOString().substring(0, 7)
      if (!donationsByMonth[month]) {
        donationsByMonth[month] = {}
      }

      const bloodType = donation.bloodType
      donationsByMonth[month][bloodType] = (donationsByMonth[month][bloodType] || 0) + donation.units
    })

    // Group usage by month and blood type
    const usageByMonth: Record<string, Record<string, number>> = {}

    usageRecords.forEach((usage) => {
      const month = new Date(usage.usageDate).toISOString().substring(0, 7)
      if (!usageByMonth[month]) {
        usageByMonth[month] = {}
      }

      const bloodType = usage.bloodInventory.bloodType
      usageByMonth[month][bloodType] = (usageByMonth[month][bloodType] || 0) + usage.units
    })

    // Get current inventory levels
    const currentInventory = await prisma.bloodInventory.findMany()

    // Prepare historical data for AI prediction
    const historicalData = {
      donationsByMonth,
      usageByMonth,
      currentInventory: currentInventory.map((item) => ({
        bloodType: item.bloodType,
        units: item.units,
        status: item.status,
      })),
    }

    // Generate predictions using AI
    const predictions = await predictFutureDonationNeeds(historicalData)

    return NextResponse.json({
      success: true,
      data: {
        historicalData,
        predictions,
      },
    })
  } catch (error) {
    console.error("Error generating predictions:", error)
    return NextResponse.json({ success: false, error: "Failed to generate predictions" }, { status: 500 })
  }
}
