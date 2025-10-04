import { compare, hash } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-here"
const JWT_EXPIRES_IN = "7d"

export interface User {
  id: string
  email: string
  phone: string
  role: "patient" | "doctor" | "student" | "admin"
  firstName: string
  lastName: string
  isVerified: boolean
  isActive: boolean
}

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat: number
  exp: number
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword)
}

// Generate JWT token
export function generateToken(user: User): string {
  return sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  )
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

// Set auth cookie
export function setAuthCookie(token: string) {
  const cookieStore = cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

// Get auth cookie
export function getAuthCookie(): string | undefined {
  const cookieStore = cookies()
  return cookieStore.get("auth-token")?.value
}

// Remove auth cookie
export function removeAuthCookie() {
  const cookieStore = cookies()
  cookieStore.delete("auth-token")
}

// Get current user from token
export async function getCurrentUser(): Promise<User | null> {
  const token = getAuthCookie()
  if (!token) return null

  const payload = verifyToken(token)
  if (!payload) return null

  // In a real app, you'd fetch the user from the database
  // For now, we'll return the payload data
  return {
    id: payload.userId,
    email: payload.email,
    phone: "", // Would be fetched from DB
    role: payload.role as "patient" | "doctor" | "student" | "admin",
    firstName: "", // Would be fetched from DB
    lastName: "", // Would be fetched from DB
    isVerified: true,
    isActive: true,
  }
}

// Generate OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone format (Indian format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\D/g, ""))
}

// Validate password strength
export function isValidPassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
