import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// This is a utility endpoint to seed the database with sample data for testing analytics
export async function POST() {
  try {
    // Clear existing data
    await prisma.bloodUsage.deleteMany({})
    await prisma.healthRecord.deleteMany({})
    await prisma.donation.deleteMany({})
    await prisma.appointment.deleteMany({})
    await prisma.bloodInventory.deleteMany({})
    await prisma.bloodRequest.deleteMany({})
    await prisma.donor.deleteMany({})
    await prisma.donationCenter.deleteMany({})

    // Create donation centers
    const centers = await Promise.all([
      prisma.donationCenter.create({
        data: {
          name: "City General Hospital Blood Center",
          address: "123 Medical Drive",
          city: "Cityville",
          state: "State",
          zip: "12345",
          phone: "(555) 123-4567",
          email: "blood@citygeneral.org",
          operatingHours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
          capacity: 50,
          currentWaitTime: "15 min",
        },
      }),
      prisma.donationCenter.create({
        data: {
          name: "Downtown Blood Donation Clinic",
          address: "456 Central Avenue",
          city: "Cityville",
          state: "State",
          zip: "12345",
          phone: "(555) 987-6543",
          email: "info@downtownblood.org",
          operatingHours: "Mon-Sat: 9AM-7PM",
          capacity: 40,
          currentWaitTime: "30 min",
        },
      }),
      prisma.donationCenter.create({
        data: {
          name: "University Hospital",
          address: "101 University Way",
          city: "Collegetown",
          state: "State",
          zip: "12346",
          phone: "(555) 234-5678",
          email: "blood@universityhealth.org",
          operatingHours: "Mon-Fri: 8AM-5PM",
          capacity: 30,
          currentWaitTime: "10 min",
        },
      }),
    ])

    // Create donors
    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    const donorLevels = ["Bronze", "Silver", "Gold", "Platinum"]

    const donors = []
    for (let i = 1; i <= 100; i++) {
      const registrationDate = new Date()
      registrationDate.setMonth(registrationDate.getMonth() - Math.floor(Math.random() * 24)) // Random registration in last 2 years

      const totalDonations = Math.floor(Math.random() * 10)
      const donorLevel = donorLevels[Math.min(Math.floor(totalDonations / 3), 3)]

      const donor = await prisma.donor.create({
        data: {
          name: `Donor ${i}`,
          email: `donor${i}@example.com`,
          phone: `(555) ${String(100 + i).padStart(3, "0")}-${String(1000 + i).substring(1)}`,
          address: `${1000 + i} Main St`,
          city: "Cityville",
          state: "State",
          zip: "12345",
          bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
          dateOfBirth: new Date(
            1970 + Math.floor(Math.random() * 30),
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1,
          ),
          registrationDate,
          donorLevel,
          totalDonations,
          isActive: Math.random() > 0.1, // 90% active
        },
      })

      donors.push(donor)
    }

    // Create donations
    const donations = []
    const now = new Date()

    for (let i = 0; i < 500; i++) {
      const donationDate = new Date()
      donationDate.setMonth(now.getMonth() - Math.floor(Math.random() * 12)) // Random donation in last year
      donationDate.setDate(Math.floor(Math.random() * 28) + 1) // Random day of month

      const donor = donors[Math.floor(Math.random() * donors.length)]
      const center = centers[Math.floor(Math.random() * centers.length)]

      const donation = await prisma.donation.create({
        data: {
          donationDate,
          bloodType: donor.bloodType,
          units: 1,
          status: "Completed",
          location: center.name,
          donorId: donor.id,
          donationCenterId: center.id,
          healthRecord: {
            create: {
              hemoglobin: `${(Math.random() * 3 + 12).toFixed(1)} g/dL`,
              bloodPressure: `${Math.floor(Math.random() * 20 + 110)}/${Math.floor(Math.random() * 10 + 70)} mmHg`,
              pulse: `${Math.floor(Math.random() * 20 + 60)} bpm`,
              weight: `${Math.floor(Math.random() * 50 + 120)} lbs`,
              notes: "All parameters normal.",
            },
          },
        },
      })

      donations.push(donation)

      // Update donor's last donation date
      if (donationDate > (donor.lastDonation || new Date(0))) {
        await prisma.donor.update({
          where: { id: donor.id },
          data: {
            lastDonation: donationDate,
            nextEligibleDate: new Date(donationDate.getTime() + 56 * 24 * 60 * 60 * 1000), // 56 days later
          },
        })
      }
    }

    // Create blood inventory
    for (const bloodType of bloodTypes) {
      const units = Math.floor(Math.random() * 100) + (bloodType.includes("-") ? 10 : 50) // Less inventory for negative types
      const status = units < 20 ? "Critical" : units < 50 ? "Low" : "Adequate"

      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 42) // 42 days shelf life

      await prisma.bloodInventory.create({
        data: {
          bloodType,
          units,
          status,
          expirationDate,
          donationCenterId: centers[0].id, // Assign to first center
        },
      })
    }

    // Create blood usage records
    const purposes = ["Surgery", "Trauma", "Cancer Treatment", "Childbirth", "Anemia", "Other"]
    const hospitals = [
      "City General Hospital",
      "Memorial Hospital",
      "Children's Medical Center",
      "University Hospital",
      "Veterans Medical Center",
    ]

    for (let i = 0; i < 300; i++) {
      const usageDate = new Date()
      usageDate.setMonth(now.getMonth() - Math.floor(Math.random() * 12)) // Random usage in last year
      usageDate.setDate(Math.floor(Math.random() * 28) + 1) // Random day of month

      const units = Math.floor(Math.random() * 3) + 1 // 1-3 units
      const purpose = purposes[Math.floor(Math.random() * purposes.length)]
      const hospital = hospitals[Math.floor(Math.random() * hospitals.length)]

      // Get a random inventory record
      const inventories = await prisma.bloodInventory.findMany({
        take: 1,
        orderBy: {
          id: "asc",
        },
        skip: Math.floor(Math.random() * 8), // Random blood type (0-7)
      })

      if (inventories.length > 0) {
        const inventory = inventories[0]

        // Create usage record
        await prisma.bloodUsage.create({
          data: {
            usageDate,
            units,
            purpose,
            hospital,
            bloodInventoryId: inventory.id,
            donationId: donations[Math.floor(Math.random() * donations.length)].id,
          },
        })
      }
    }

    // Create appointments
    const appointmentStatuses = ["Confirmed", "Pending", "Cancelled", "Completed"]

    for (let i = 0; i < 50; i++) {
      const appointmentDate = new Date()
      appointmentDate.setDate(now.getDate() + Math.floor(Math.random() * 30) - 15) // -15 to +15 days from now

      const status =
        appointmentDate < now
          ? Math.random() > 0.2
            ? "Completed"
            : "Cancelled"
          : Math.random() > 0.3
            ? "Confirmed"
            : "Pending"

      await prisma.appointment.create({
        data: {
          appointmentDate,
          status,
          donorId: donors[Math.floor(Math.random() * donors.length)].id,
          donationCenterId: centers[Math.floor(Math.random() * centers.length)].id,
        },
      })
    }

    // Create blood requests
    const urgencyLevels = ["Critical", "High", "Medium", "Low"]
    const requestStatuses = ["Pending", "Processing", "Fulfilled", "Cancelled"]

    for (let i = 0; i < 30; i++) {
      const requestDate = new Date()
      requestDate.setDate(now.getDate() - Math.floor(Math.random() * 30)) // Last 30 days

      const urgency = urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)]
      const status =
        requestDate.getDate() < now.getDate() - 7
          ? Math.random() > 0.3
            ? "Fulfilled"
            : Math.random() > 0.5
              ? "Cancelled"
              : "Processing"
          : Math.random() > 0.5
            ? "Pending"
            : "Processing"

      const fulfillmentDate =
        status === "Fulfilled"
          ? new Date(requestDate.getTime() + Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000)) // 0-3 days after request
          : null

      await prisma.bloodRequest.create({
        data: {
          requestDate,
          hospital: hospitals[Math.floor(Math.random() * hospitals.length)],
          bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
          units: Math.floor(Math.random() * 5) + 1, // 1-5 units
          urgency,
          status,
          fulfillmentDate,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      summary: {
        donors: donors.length,
        donations: donations.length,
        centers: centers.length,
      },
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ success: false, error: "Failed to seed database" }, { status: 500 })
  }
}
