import { type NextRequest, NextResponse } from "next/server"
import { verifyPassword, generateToken, setAuthCookie, isValidEmail } from "@/lib/auth"
import { getUserByEmail, getUserByPhone } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { identifier, password } = body // identifier can be email or phone

    // Validation
    if (!identifier || !password) {
      return NextResponse.json({ error: "Email/phone and password are required" }, { status: 400 })
    }

    // Determine if identifier is email or phone
    const isEmail = isValidEmail(identifier)
    let user

    if (isEmail) {
      user = await getUserByEmail(identifier)
    } else {
      // Clean phone number (remove any non-digits)
      const cleanPhone = identifier.replace(/\D/g, "")
      user = await getUserByPhone(cleanPhone)
    }

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 401 })
    }

    // Generate JWT token
    const userForToken = {
      id: user._id?.toString(),
      email: user.email,
      phone: user.phone,
      role: user.role as "patient" | "doctor" | "student" | "admin",
      firstName: user.firstName,
      lastName: user.lastName,
      isVerified: user.isVerified,
      isActive: user.isActive,
    }

    const token = generateToken(userForToken)
    setAuthCookie(token)

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id?.toString(),
          email: user.email,
          phone: user.phone,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          isVerified: user.isVerified,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
