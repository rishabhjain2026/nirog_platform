import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { VerificationForm } from "@/components/doctor/verification-form"
import { Header } from "@/components/header"

export default async function DoctorVerifyPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  if (user.role !== "doctor") {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} userRole={user.role} userName={`${user.firstName} ${user.lastName}`} />
      <div className="container mx-auto px-4 py-8">
        <VerificationForm userId={user.id} />
      </div>
    </div>
  )
}
