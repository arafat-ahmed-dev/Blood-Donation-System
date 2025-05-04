import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const bloodType = searchParams.get("bloodType");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Build the query
    const query: any = {};

    if (userId) {
      query.requesterId = userId;
    }

    if (status) {
      query.status = status;
    }

    if (bloodType) {
      query.bloodType = bloodType;
    }

    // Get requests
    const requests = await prisma.bloodRequest.findMany({
      where: query,
      include: {
        hospital: {
          select: {
            name: true,
            address: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    // Get total count
    const total = await prisma.bloodRequest.count({
      where: query,
    });

    return NextResponse.json({
      requests,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blood requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch blood requests" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      bloodType,
      units,
      urgency,
      hospitalId,
      contactName,
      contactPhone,
      notes,
    } = body;

    // Validate required fields
    if (!bloodType || !units || !urgency || !hospitalId || !contactPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a unique request ID (you might want to use a more sophisticated method)
    const requestId = `REQ-${Date.now()}`;

    // Create the blood request
    const bloodRequest = await prisma.bloodRequest.create({
      data: {
        requestId,
        bloodType,
        units,
        urgency,
        hospitalId,
        contactName,
        contactPhone,
        notes,
        status: "Pending",
        requestedDate: new Date(), // Added this required field
      },
    });

    // Find eligible donors for notification
    const eligibleDonors = await prisma.donor.findMany({
      where: {
        bloodType,
        nextEligibleDate: {
          lte: new Date(),
        },
      },
      select: {
        id: true,
      },
    });

    // Create notifications for eligible donors
    if (eligibleDonors.length > 0) {
      await prisma.notification.createMany({
        data: eligibleDonors.map((donor: { id: string }) => ({
          userId: donor.id,
          title: "Urgent Blood Request",
          message: `There is an urgent request for ${bloodType} blood. Please check if you can help.`,
          type: "Urgent",
        })),
      });
    }

    return NextResponse.json({ bloodRequest });
  } catch (error) {
    console.error("Error creating blood request:", error);
    return NextResponse.json(
      { error: "Failed to create blood request" },
      { status: 500 }
    );
  }
}
