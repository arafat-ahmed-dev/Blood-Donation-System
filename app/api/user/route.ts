import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        bloodType: true,
        phone: true,
        role: true,
        eligibility: true,
        nextEligibleDate: true,
        lastDonationDate: true,
        image: true,
        location: {
          select: {
            address: true,
            city: true,
            upazila: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, phone, address, city, upazila, currentPassword, newPassword } = body

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user data
    const userData: any = {}
    if (firstName) userData.firstName = firstName
    if (lastName) userData.lastName = lastName
    if (phone) userData.phone = phone

    // Check if password change is requested
    if (currentPassword && newPassword) {
      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.hashedPassword || "")
      if (!isPasswordValid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
      }

      // Hash new password
      userData.hashedPassword = await bcrypt.hash(newPassword, 10)
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: userData,
    })

    // Update location if provided
    if (address || city || upazila) {
      const locationData: any = {}
      if (address) locationData.address = address
      if (city) locationData.city = city
      if (upazila) locationData.upazila = upazila

      // Check if location exists
      const location = await prisma.location.findFirst({
        where: {
          userId: session.user.id,
        },
      })

      if (location) {
        await prisma.location.update({
          where: {
            id: location.id,
          },
          data: locationData,
        })
      } else {
        await prisma.location.create({
          data: {
            ...locationData,
            userId: session.user.id,
          },
        })
      }
    }

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      },
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 })
  }
}
