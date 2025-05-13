import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/HeroSection"
import { SearchSection } from "@/components/home/SearchSection"
import { UrgentNeedsSection } from "@/components/home/UrgentNeedsSection"
import { HowItWorksSection } from "@/components/home/HowItWorksSection"
import { BloodBanksSection } from "@/components/home/BloodBanksSection"
import { ResourcesSection } from "@/components/home/ResourcesSection"
import { ImpactStatsSection } from "@/components/home/ImpactStatsSection"
import { CTASection } from "@/components/home/CTASection"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SearchSection />
        <UrgentNeedsSection />
        <HowItWorksSection />
        <BloodBanksSection />
        <ResourcesSection />
        <ImpactStatsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
