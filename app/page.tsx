import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/layout/layout/hero";
import { Statistics } from "@/components/layout/layout/statistics";
import { HowItWorks } from "@/components/layout/layout/how-it-works";
import { EmergencyRequests } from "@/components/layout/layout/blood/emergency-requests";
import { FeaturedDonors } from "@/components/layout/layout/donors/featured-donors";
import { Testimonials } from "@/components/layout/layout/testimonials";
import { BloodCompatibility } from "@/components/layout/layout/blood/blood-compatibility";
import { CTA } from "@/components/layout/layout/cta";

export const metadata: Metadata = {
  title: "রক্ত - বাংলাদেশে রক্তদান প্ল্যাটফর্ম",
  description:
    "রক্ত একটি রিয়েল-টাইম ফ্রি প্ল্যাটফর্ম যা রক্ত অনুসন্ধানকারীদের স্বেচ্ছাসেবী রক্তদাতাদের সাথে সংযুক্ত করতে সহায়তা করে।",
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statistics />
        <HowItWorks />
        <EmergencyRequests />
        <FeaturedDonors />
        <BloodCompatibility />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
