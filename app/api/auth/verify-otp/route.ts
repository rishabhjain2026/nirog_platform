import { type NextRequest, NextResponse } from "next/server"
import { verifyOTP } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, otpCode, purpose } = body

    // Validation
    if (!phone || !otpCode || !purpose) {
      return NextResponse.json({ error: "Phone, OTP code, and purpose are required" }, { status: 400 })
    }

    // Clean phone number
    const cleanPhone = phone.replace(/\D/g, "")

    // Verify OTP
    const result = await verifyOTP(cleanPhone, otpCode, purpose)

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }

    return NextResponse.json({ message: result.message }, { status: 200 })
  } catch (error) {
    console.error("OTP verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
