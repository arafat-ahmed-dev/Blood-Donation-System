import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import DonorSearchClient from "./DonorSearchClient";
import prisma from "../../../../lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/constants";
import { getReadableLocation } from "@/lib/utils";

export default async function DonorSearchPage() {
  const [data, count] = await prisma.$transaction([
    prisma.user.findMany({
      where: { role: "donor" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        bloodType: true,
        location: true,
        eligibility: true,
        nextEligibleDate: true,
        donations: true
      },
      take: ITEM_PER_PAGE,
    }),
    prisma.user.count({ where: { role: "donor" } }),
  ]);
  console.log(data);
  
  const donors = await Promise.all(
    data.map(async (donor, index) => {
      const formattedDate = donor.nextEligibleDate
        ? new Date(donor.nextEligibleDate).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
        })
        : null;

      const location: string = await getReadableLocation(
        donor?.location?.coordinates[1], // latitude
        donor?.location?.coordinates[0]  // longitude
      );

      return {
        id: donor.id ? Number(donor.id) : index,
        name: `${donor.firstName} ${donor.lastName}`,
        bloodGroup: donor.bloodType.replace("_", "-"),
        location: location,
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
      <Footer />
    </>
  );
}
