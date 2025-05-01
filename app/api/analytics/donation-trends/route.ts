import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "month"
    const limit = Number.parseInt(searchParams.get("limit") || "12")

    // Get current date
    const now = new Date()

    // Calculate start date based on period
    const startDate = new Date()
    if (period === "week") {
      startDate.setDate(now.getDate() - limit * 7)
    } else if (period === "month") {
      startDate.setMonth(now.getMonth() - limit)
    } else if (period === "year") {
      startDate.setFullYear(now.getFullYear() - limit)
    } else {
      // Default to last 12 months
      startDate.setMonth(now.getMonth() - 12)
    }

    // Get all donations since start date
    const donations = await prisma.donation.findMany({
      where: {
        donationDate: {
          gte: startDate,
        },
        status: "Completed",
      },
      include: {
        donor: {
          select: {
            bloodType: true,
          },
        },
      },
      orderBy: {
        donationDate: "asc",
      },
    })

    // Group donations by period
    const donationsByPeriod: Record<string, { total: number; byBloodType: Record<string, number> }> = {}

    donations.forEach((donation) => {
      let periodKey: string
      const date = new Date(donation.donationDate)

      if (period === "week") {
        // Format as YYYY-WW (year and week number)
        const weekNumber = Math.ceil((date.getDate() + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7)
        periodKey = `${date.getFullYear()}-W${weekNumber}`
      } else if (period === "month") {
        // Format as YYYY-MM
        periodKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      } else {
        // Format as YYYY
        periodKey = `${date.getFullYear()}`
      }

      if (!donationsByPeriod[periodKey]) {
        donationsByPeriod[periodKey] = {
          total: 0,
          byBloodType: {},
        }
      }

      donationsByPeriod[periodKey].total += donation.units

      const bloodType = donation.bloodType
      if (!donationsByPeriod[periodKey].byBloodType[bloodType]) {
        donationsByPeriod[periodKey].byBloodType[bloodType] = 0
      }
      donationsByPeriod[periodKey].byBloodType[bloodType] += donation.units
    })

    // Convert to array and sort by period
    const result = Object.entries(donationsByPeriod)
      .map(([period, data]) => ({
        period,
        ...data,
      }))
      .sort((a, b) => a.period.localeCompare(b.period))

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("Error fetching donation trends:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch donation trends" }, { status: 500 })
  }
}
