import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const inventory = await prisma.bloodInventory.findMany({
      orderBy: {
        bloodType: "asc",
      },
    })

    // Calculate status based on units
    const updatedInventory = inventory.map((item) => {
      let status = "Adequate"
      let level = 75

      if (item.units < 20) {
        status = "Critical"
        level = 20
      } else if (item.units < 50) {
        status = "Low"
        level = 50
      }

      return {
        ...item,
        status,
        level,
      }
    })

    return NextResponse.json({ inventory: updatedInventory })
  } catch (error) {
    console.error("Error fetching blood inventory:", error)
    return NextResponse.json({ error: "Failed to fetch blood inventory" }, { status: 500 })
  }
}
