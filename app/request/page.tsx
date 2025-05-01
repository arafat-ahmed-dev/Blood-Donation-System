import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import BloodRequestForm from "./BloodRequestForm"

export default function RequestPage() {
  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold mb-4">Request Blood</h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below to submit a blood request. We'll notify eligible donors in your area.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <BloodRequestForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
