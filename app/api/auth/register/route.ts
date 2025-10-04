import { type NextRequest, NextResponse } from "next/server"
import { hashPassword, generateToken, setAuthCookie, isValidEmail, isValidPhone, isValidPassword } from "@/lib/auth"
import { createUser, getUserByEmail, getUserByPhone } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, phone, password, role, firstName, lastName } = body

    // Validation
    if (!email || !phone || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 })
    }

    const passwordValidation = isValidPassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json({ error: passwordValidation.errors[0] }, { status: 400 })
    }

    const validRoles = ["patient", "doctor", "student"]
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    // Check if user already exists
    const existingUserByEmail = await getUserByEmail(email)
    if (existingUserByEmail) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    const existingUserByPhone = await getUserByPhone(phone)
    if (existingUserByPhone) {
      return NextResponse.json({ error: "User with this phone number already exists" }, { status: 409 })
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const result = await createUser({
      email,
      phone,
      passwordHash,
      role,
      firstName,
      lastName,
    })

    // Get the created user ID
    const userId = result._id?.toString()

    // Generate JWT token
    const user = {
      id: userId,
      email,
      phone,
      role: role as "patient" | "doctor" | "student" | "admin",
      firstName,
      lastName,
      isVerified: false,
      isActive: true,
    }

    const token = generateToken(user)
    setAuthCookie(token)

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: userId,
          email,
          phone,
          role,
          firstName,
          lastName,
          isVerified: false,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
