import { type NextRequest, NextResponse } from "next/server"
import { generateOTP, isValidPhone } from "@/lib/auth"
import { storeOTP } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, purpose } = body

    // Validation
    if (!phone || !purpose) {
      return NextResponse.json({ error: "Phone and purpose are required" }, { status: 400 })
    }

    // Clean and validate phone number
    const cleanPhone = phone.replace(/\D/g, "")
    if (!isValidPhone(cleanPhone)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 })
    }

    const validPurposes = ["registration", "login", "password_reset"]
    if (!validPurposes.includes(purpose)) {
      return NextResponse.json({ error: "Invalid purpose" }, { status: 400 })
    }

    // Generate OTP
    const otpCode = generateOTP()

    // Store OTP in database
    await storeOTP(cleanPhone, otpCode, purpose)

    // In a real application, you would send the OTP via SMS
    // For development, we'll just log it
    console.log(`OTP for ${cleanPhone}: ${otpCode}`)

    // TODO: Integrate with SMS service
    // await sendSMS(cleanPhone, `Your Nirog OTP is: ${otpCode}. Valid for 10 minutes.`)

    return NextResponse.json(
      {
        message: "OTP sent successfully",
        // In development, return the OTP for testing
        ...(process.env.NODE_ENV === "development" && { otp: otpCode }),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
