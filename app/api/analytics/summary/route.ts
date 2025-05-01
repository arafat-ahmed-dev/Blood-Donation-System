import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Get total donations
    const totalDonations = await prisma.donation.count({
      where: {
        status: "Completed",
      },
    })

    // Get total donors
    const totalDonors = await prisma.donor.count()

    // Get active donors (donated in the last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const activeDonors = await prisma.donor.count({
      where: {
        donations: {
          some: {
            donationDate: {
              gte: sixMonthsAgo,
            },
            status: "Completed",
          },
        },
      },
    })

    // Get total units collected
    const unitsCollected = await prisma.donation.aggregate({
      where: {
        status: "Completed",
      },
      _sum: {
        units: true,
      },
    })

    // Get total units used
    const unitsUsed = await prisma.bloodUsage.aggregate({
      _sum: {
        units: true,
      },
    })

    // Get current inventory by blood type
    const currentInventory = await prisma.bloodInventory.groupBy({
      by: ["bloodType"],
      _sum: {
        units: true,
      },
    })

    // Get critical inventory levels
    const criticalInventory = await prisma.bloodInventory.groupBy({
      by: ["bloodType"],
      where: {
        status: "Critical",
      },
      _sum: {
        units: true,
      },
    })

    // Get pending appointments
    const pendingAppointments = await prisma.appointment.count({
      where: {
        status: "Pending",
      },
    })

    // Get upcoming appointments (next 7 days)
    const now = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(now.getDate() + 7)

    const upcomingAppointments = await prisma.appointment.count({
      where: {
        appointmentDate: {
          gte: now,
          lt: nextWeek,
        },
        status: "Confirmed",
      },
    })

    // Get pending blood requests
    const pendingRequests = await prisma.bloodRequest.count({
      where: {
        status: "Pending",
      },
    })

    // Get critical blood requests
    const criticalRequests = await prisma.bloodRequest.count({
      where: {
        urgency: "Critical",
        status: {
          in: ["Pending", "Processing"],
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        totalDonations,
        totalDonors,
        activeDonors,
        donorRetentionRate: totalDonors > 0 ? Math.round((activeDonors / totalDonors) * 100) : 0,
        unitsCollected: unitsCollected._sum.units || 0,
        unitsUsed: unitsUsed._sum.units || 0,
        currentInventory: currentInventory.map((item) => ({
          bloodType: item.bloodType,
          units: item._sum.units || 0,
        })),
        criticalInventory: criticalInventory.map((item) => ({
          bloodType: item.bloodType,
          units: item._sum.units || 0,
        })),
        pendingAppointments,
        upcomingAppointments,
        pendingRequests,
        criticalRequests,
      },
    })
  } catch (error) {
    console.error("Error fetching analytics summary:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch analytics summary" }, { status: 500 })
  }
}
