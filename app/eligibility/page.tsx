import { EligibilityChecker } from "@/components/eligibility/eligibility-checker"

export default function EligibilityPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">Donation Eligibility</h1>
          <p className="text-muted-foreground">Check if you're eligible to donate blood</p>
        </div>

        <EligibilityChecker />
      </div>
    </div>
  )
}
