import ProfileClient from "./ProfileClient"
import ClientLayout from "@/components/layout/clientLayout"

export default function ProfilePage() {
  return (
    <ClientLayout>
      <main className="py-16 bg-gray-50">
        <div className="container">
          <ProfileClient />
        </div>
      </main>
    </ClientLayout>
  )
}
