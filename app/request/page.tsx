import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import BloodRequestForm from "./BloodRequestForm"

export default function RequestPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-50">
        <BloodRequestForm />
      </main>
      <Footer />
    </>
  )
}
