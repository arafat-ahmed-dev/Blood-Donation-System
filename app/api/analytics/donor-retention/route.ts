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

    // Get all donors registered before the start date
    const existingDonors = await prisma.donor.count({
      where: {
        registrationDate: {
          lt: startDate,
        },
      },
    })

    // Get all donors who donated at least once in each period
    const activeDonorsByPeriod: Record<string, number> = {}
    const newDonorsByPeriod: Record<string, number> = {}

    // Loop through each period
    const currentPeriodStart = new Date(startDate)
    let currentPeriodEnd = new Date(startDate)

    for (let i = 0; i < limit; i++) {
      let periodKey: string

      if (period === "week") {
        // Set end date to 7 days after start
        currentPeriodEnd = new Date(currentPeriodStart)
        currentPeriodEnd.setDate(currentPeriodStart.getDate() + 7)

        // Format as YYYY-WW (year and week number)
        const weekNumber = Math.ceil(
          (currentPeriodStart.getDate() +
            new Date(currentPeriodStart.getFullYear(), currentPeriodStart.getMonth(), 1).getDay()) /
            7,
        )
        periodKey = `${currentPeriodStart.getFullYear()}-W${weekNumber}`
      } else if (period === "month") {
        // Set end date to last day of month
        currentPeriodEnd = new Date(currentPeriodStart.getFullYear(), currentPeriodStart.getMonth() + 1, 0)

        // Format as YYYY-MM
        periodKey = `${currentPeriodStart.getFullYear()}-${String(currentPeriodStart.getMonth() + 1).padStart(2, "0")}`
      } else {
        // Set end date to last day of year
        currentPeriodEnd = new Date(currentPeriodStart.getFullYear(), 11, 31)

        // Format as YYYY
        periodKey = `${currentPeriodStart.getFullYear()}`
      }

      // Count active donors in this period (donors who made a donation)
      const activeDonors = await prisma.donor.count({
        where: {
          registrationDate: {
            lt: currentPeriodStart,
          },
          donations: {
            some: {
              donationDate: {
                gte: currentPeriodStart,
                lt: currentPeriodEnd,
              },
              status: "Completed",
            },
          },
        },
      })

      // Count new donors in this period
      const newDonors = await prisma.donor.count({
        where: {
          registrationDate: {
            gte: currentPeriodStart,
            lt: currentPeriodEnd,
          },
        },
      })

      activeDonorsByPeriod[periodKey] = activeDonors
      newDonorsByPeriod[periodKey] = newDonors

      // Move to next period
      if (period === "week") {
        currentPeriodStart.setDate(currentPeriodStart.getDate() + 7)
      } else if (period === "month") {
        currentPeriodStart.setMonth(currentPeriodStart.getMonth() + 1)
      } else {
        currentPeriodStart.setFullYear(currentPeriodStart.getFullYear() + 1)
      }
    }

    // Calculate retention rates
    const retentionData = Object.entries(activeDonorsByPeriod)
      .map(([period, activeDonors]) => {
        const retentionRate = existingDonors > 0 ? (activeDonors / existingDonors) * 100 : 0
        return {
          period,
          activeDonors,
          newDonors: newDonorsByPeriod[period] || 0,
          retentionRate: Math.round(retentionRate * 100) / 100, // Round to 2 decimal places
        }
      })
      .sort((a, b) => a.period.localeCompare(b.period))

    return NextResponse.json({
      success: true,
      data: {
        existingDonors,
        retentionByPeriod: retentionData,
      },
    })
  } catch (error) {
    console.error("Error fetching donor retention:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch donor retention metrics" }, { status: 500 })
  }
}
