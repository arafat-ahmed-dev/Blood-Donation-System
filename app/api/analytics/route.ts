import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get total donors
    const totalDonors = await prisma.user.count({
      where: {
        role: "donor",
      },
    })

    // Get total donations
    const totalDonations = await prisma.donation.count({
      where: {
        status: "Completed",
      },
    })

    // Get donations by blood type
    const donationsByBloodType = await prisma.donation.groupBy({
      by: ["bloodType"],
      where: {
        status: "Completed",
      },
      _count: {
        id: true,
      },
    })

    // Get donations by month (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const donationsByMonth = await prisma.donation.groupBy({
      by: ["donationDate"],
      where: {
        status: "Completed",
        donationDate: {
          gte: sixMonthsAgo,
        },
      },
      _count: {
        id: true,
      },
    })

    // Format donations by month
    const months = []
    const counts = []

    for (let i = 0; i < 6; i++) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const month = date.toLocaleString("default", { month: "short" })
      const year = date.getFullYear()
      const label = `${month} ${year}`

      months.unshift(label)

      const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)

      const count = donationsByMonth.filter(
        (d) => new Date(d.donationDate) >= startDate && new Date(d.donationDate) <= endDate,
      ).length

      counts.unshift(count)
    }

    // Get blood inventory
    const bloodInventory = await prisma.bloodInventory.findMany()

    // Get pending requests
    const pendingRequests = await prisma.bloodRequest.count({
      where: {
        status: "Pending",
      },
    })

    // Get upcoming appointments
    const today = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(today.getDate() + 7)

    const upcomingAppointments = await prisma.appointment.count({
      where: {
        date: {
          gte: today,
          lte: nextWeek,
        },
      },
    })

    return NextResponse.json({
      totalDonors,
      totalDonations,
      donationsByBloodType: donationsByBloodType.map((d) => ({
        bloodType: d.bloodType,
        count: d._count.id,
      })),
      donationTrend: {
        labels: months,
        data: counts,
      },
      bloodInventory,
      pendingRequests,
      upcomingAppointments,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
