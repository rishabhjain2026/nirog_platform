import { SignupForm } from "@/components/auth/signup-form"
import { Header } from "@/components/header"
import Image from "next/image"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-200px)]">
          {/* Left side - Branding */}
          <div className="hidden lg:flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-balance">
                Join the{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Nirog
                </span>{" "}
                Community
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Connect with healthcare professionals, manage your health records, and access quality medical services.
              </p>
            </div>

            <div className="relative w-full max-w-md mx-auto">
              <Image
                src="/nirog-telemedicine.png"
                alt="Nirog Healthcare Community"
                width={400}
                height={300}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Why choose Nirog?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="font-medium">Verified Healthcare Professionals</p>
                    <p className="text-sm text-muted-foreground">All doctors are verified with proper credentials</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2" />
                  <div>
                    <p className="font-medium">Secure Health Records</p>
                    <p className="text-sm text-muted-foreground">Your medical data is encrypted and secure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <div>
                    <p className="font-medium">24/7 Healthcare Access</p>
                    <p className="text-sm text-muted-foreground">Get medical help whenever you need it</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <div className="flex justify-center">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  )
}
