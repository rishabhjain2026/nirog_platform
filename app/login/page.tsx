import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/header"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-200px)]">
          {/* Left side - Branding */}
          <div className="hidden lg:flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-balance">
                Welcome back to{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Nirog
                </span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Your trusted healthcare platform connecting patients, doctors, and medical professionals.
              </p>
            </div>

            <div className="relative w-full max-w-md mx-auto">
              <Image
                src="/nirog-telemedicine.png"
                alt="Nirog Telemedicine Illustration"
                width={400}
                height={300}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span>Verified Doctors</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="flex justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
