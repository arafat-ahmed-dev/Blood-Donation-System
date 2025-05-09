import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import ProfileClient from "./ProfileClient"

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50">
        <div className="container">
          <ProfileClient />
        </div>
      </main>
      <Footer />
    </>
  )
}
