import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { generateInsights } from "@/lib/gemini"

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
            age: true,
            gender: true,
            registrationDate: true,
          },
        },
      },
      orderBy: {
        donationDate: "asc",
      },
    })

    // Get blood inventory
    const inventory = await prisma.bloodInventory.findMany({
      include: {
        usageRecords: {
          where: {
            usageDate: {
              gte: startDate,
            },
          },
        },
      },
    })

    // Get donor retention data
    const donors = await prisma.donor.findMany({
      where: {
        registrationDate: {
          gte: startDate,
        },
      },
      select: {
        id: true,
        registrationDate: true,
        lastDonationDate: true,
        totalDonations: true,
        bloodType: true,
        age: true,
        gender: true,
      },
    })

    // Prepare data for AI analysis
    const analyticsData = {
      donations: {
        total: donations.length,
        byBloodType: donations.reduce(
          (acc, donation) => {
            const bloodType = donation.bloodType
            acc[bloodType] = (acc[bloodType] || 0) + 1
            return acc
          },
          {} as Record<string, number>,
        ),
        byMonth: donations.reduce(
          (acc, donation) => {
            const month = new Date(donation.donationDate).toISOString().substring(0, 7)
            acc[month] = (acc[month] || 0) + 1
            return acc
          },
          {} as Record<string, number>,
        ),
      },
      inventory: {
        current: inventory.map((item) => ({
          bloodType: item.bloodType,
          units: item.units,
          status: item.status,
        })),
        usage: inventory.flatMap((item) =>
          item.usageRecords.map((usage) => ({
            bloodType: item.bloodType,
            units: usage.units,
            purpose: usage.purpose,
            date: usage.usageDate,
          })),
        ),
      },
      donors: {
        total: donors.length,
        active: donors.filter((donor) => donor.lastDonationDate && new Date(donor.lastDonationDate) >= startDate)
          .length,
        byBloodType: donors.reduce(
          (acc, donor) => {
            acc[donor.bloodType] = (acc[donor.bloodType] || 0) + 1
            return acc
          },
          {} as Record<string, number>,
        ),
        demographics: {
          byAge: donors.reduce(
            (acc, donor) => {
              const ageGroup =
                donor.age < 25
                  ? "18-24"
                  : donor.age < 35
                    ? "25-34"
                    : donor.age < 45
                      ? "35-44"
                      : donor.age < 55
                        ? "45-54"
                        : "55+"
              acc[ageGroup] = (acc[ageGroup] || 0) + 1
              return acc
            },
            {} as Record<string, number>,
          ),
          byGender: donors.reduce(
            (acc, donor) => {
              acc[donor.gender] = (acc[donor.gender] || 0) + 1
              return acc
            },
            {} as Record<string, number>,
          ),
        },
      },
    }

    // Generate AI insights
    const insights = await generateInsights(analyticsData)

    return NextResponse.json({
      success: true,
      data: {
        analyticsData,
        insights,
      },
    })
  } catch (error) {
    console.error("Error generating AI insights:", error)
    return NextResponse.json({ success: false, error: "Failed to generate AI insights" }, { status: 500 })
  }
}
