import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { DoctorVerificationPanel } from "@/components/admin/doctor-verification-panel"
import { Header } from "@/components/header"

export default async function AdminDoctorsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  if (user.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} userRole={user.role} userName={`${user.firstName} ${user.lastName}`} />
      <div className="container mx-auto px-4 py-8">
        <DoctorVerificationPanel />
      </div>
    </div>
  )
}
