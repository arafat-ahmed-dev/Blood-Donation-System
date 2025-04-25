import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import DonorSearchClient from "./DonorSearchClient";
import { DEFAULT_LOCATION, ITEM_PER_PAGE } from "@/lib/constants";
import { formatBloodGroup } from "@/lib/utils";
import prisma from "../../../../prisma";
import Pagination from "@/components/layout/Pagination";
import { BloodType, Prisma } from "@prisma/client";

export default async function DonorSearchPage({ searchParams }: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  console.log(queryParams);

  const query: Prisma.UserWhereInput = {
    eligibility: true,
    role: "donor",
  };

  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      switch (key) {
        case "bloodGroup":
          // Convert the blood group to the format used in the database
          const blood = value.replace("-", "_").toUpperCase();
          query.bloodType = BloodType[blood as keyof typeof BloodType] || undefined;
          break;
        case "city":
          // Using nested filtering for location.city
          query.location = {
            city: value
          };
          break;
        case "upazila":
          // Using nested filtering for location.upazila
          query.location = {
            upazila: value
          };
          break;
        default:
          break;
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.user.findMany({
      where: query,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        bloodType: true,
        location: true,
        eligibility: true,
        nextEligibleDate: true,
        donations: {
          select: {
            id: true,
          }
        }
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.user.count({ where: query }),
  ]);
  console.log(data, count);

  const donors = await Promise.all(
    data.map(async (donor, index) => {
      const formattedDate = donor.nextEligibleDate
        ? new Date(donor.nextEligibleDate).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
        })
        : null;

      // Format location data according to the Location interface
      const defaultLocation = typeof DEFAULT_LOCATION === 'string' 
        ? { address: DEFAULT_LOCATION, state: '', city: '' }
        : DEFAULT_LOCATION;

      const location = donor.location || defaultLocation;

      return {
        id: donor.id ? Number(donor.id) : index,
        name: `${donor.firstName} ${donor.lastName}`,
        bloodGroup: formatBloodGroup(donor.bloodType.replace("_", "-")),
        location,
        lastDonation: formattedDate
          ? `Eligible after ${formattedDate}`
          : "Available now",
        donationCount: donor.donations?.length || 0,
        available: donor.eligibility,
      };
    })
  );


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
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
      <Footer />
    </>
  );
}
