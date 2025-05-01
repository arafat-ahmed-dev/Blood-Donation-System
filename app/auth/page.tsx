import { AuthForm } from "@/components/auth/auth-form"

export default function AuthPage() {
  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Account Access</h1>
        <AuthForm />
      </div>
    </div>
  )
}
