import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import DonorSearchClient from "./DonorSearchClient"
import { ITEM_PER_PAGE } from "@/lib/constants"
import prisma from "@/lib/prisma"
import Pagination from "@/components/layout/Pagination"
import { type Prisma } from "@prisma/client"

export default async function DonorSearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const { page, ...queryParams } = searchParams
  const p = page ? Number.parseInt(page) : 1

  const query: Prisma.DonorWhereInput = {}

  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      switch (key) {
        case "bloodType":
          query.bloodType = value
          break
        case "city":
          query.city = value
          break
        case "upazila":
          query.upazila = value
          break
        default:
          break
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.donor.findMany({
      where: query,
      select: {
        id: true,
        name: true,
        bloodType: true,
        city: true,
        upazila: true,
        address: true,
        nextEligibleDate: true,
        totalDonations: true,
        donations: {
          select: {
            id: true,
          },
        },
      },
      take: ITEM_PER_PAGE,
      orderBy: {
        nextEligibleDate: "asc",
      },
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.donor.count({ where: query }),
  ])
  

  const donors = data.map((donor) => {
    const formattedDate = donor.nextEligibleDate
      ? new Date(donor.nextEligibleDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
      })
      : null

    const location = {
      address: donor.address || "",
      city: donor.city || "",
      upazila: donor.upazila || "",
    }
    
    return {
      id: donor.id,
      name: donor.name,
      bloodType: donor.bloodType,
      location,
      nextEligibleDate: formattedDate ? `Eligible after ${formattedDate}` : "Available now",
      donationCount: donor.totalDonations,
      available: donor.nextEligibleDate ? new Date() >= new Date(donor.nextEligibleDate) : true,
    }
  })

  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold mb-4">Find Blood Donors</h1>
            <p className="text-lg text-muted-foreground">
              Search for potential blood donors based on blood group, location, and availability.
            </p>
          </div>

          <DonorSearchClient donors={donors} />
        </div>
      </main>
      <Pagination page={p} count={count} />
      <Footer />
    </>
  )
}
