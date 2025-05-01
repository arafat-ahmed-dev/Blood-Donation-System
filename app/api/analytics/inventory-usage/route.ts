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

    // Get all blood usage records since start date
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

    // Group usage by period and purpose
    const usageByPeriod: Record<
      string,
      {
        total: number
        byBloodType: Record<string, number>
        byPurpose: Record<string, number>
      }
    > = {}

    usageRecords.forEach((usage) => {
      let periodKey: string
      const date = new Date(usage.usageDate)

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

      if (!usageByPeriod[periodKey]) {
        usageByPeriod[periodKey] = {
          total: 0,
          byBloodType: {},
          byPurpose: {},
        }
      }

      usageByPeriod[periodKey].total += usage.units

      const bloodType = usage.bloodInventory.bloodType
      if (!usageByPeriod[periodKey].byBloodType[bloodType]) {
        usageByPeriod[periodKey].byBloodType[bloodType] = 0
      }
      usageByPeriod[periodKey].byBloodType[bloodType] += usage.units

      const purpose = usage.purpose
      if (!usageByPeriod[periodKey].byPurpose[purpose]) {
        usageByPeriod[periodKey].byPurpose[purpose] = 0
      }
      usageByPeriod[periodKey].byPurpose[purpose] += usage.units
    })

    // Get current inventory levels
    const currentInventory = await prisma.bloodInventory.groupBy({
      by: ["bloodType", "status"],
      _sum: {
        units: true,
      },
    })

    // Format inventory data
    const inventoryByType = currentInventory.reduce(
      (acc, item) => {
        if (!acc[item.bloodType]) {
          acc[item.bloodType] = {
            total: 0,
            byStatus: {},
          }
        }
        acc[item.bloodType].total += item._sum.units || 0
        acc[item.bloodType].byStatus[item.status] = item._sum.units || 0
        return acc
      },
      {} as Record<string, { total: number; byStatus: Record<string, number> }>,
    )

    // Convert to array and sort by period
    const usageResult = Object.entries(usageByPeriod)
      .map(([period, data]) => ({
        period,
        ...data,
      }))
      .sort((a, b) => a.period.localeCompare(b.period))

    return NextResponse.json({
      success: true,
      data: {
        usageByPeriod: usageResult,
        currentInventory: inventoryByType,
      },
    })
  } catch (error) {
    console.error("Error fetching inventory usage:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch inventory usage patterns" }, { status: 500 })
  }
}
