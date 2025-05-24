import { HeroSection } from "@/components/home/HeroSection"
import { SearchSection } from "@/components/home/SearchSection"
import { UrgentNeedsSection } from "@/components/home/UrgentNeedsSection"
import { HowItWorksSection } from "@/components/home/HowItWorksSection"
import { BloodBanksSection } from "@/components/home/BloodBanksSection"
import { ResourcesSection } from "@/components/home/ResourcesSection"
import { ImpactStatsSection } from "@/components/home/ImpactStatsSection"
import { CTASection } from "@/components/home/CTASection"
import ClientLayout from "@/components/layout/clientLayout"

export default function Home() {
  return (
    <ClientLayout>
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
    </ClientLayout>
  )
}
