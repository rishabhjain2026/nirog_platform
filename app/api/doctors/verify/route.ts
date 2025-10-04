import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { executeQuery } from "@/lib/database"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser()
    if (!user || user.role !== "doctor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()

    // Extract form data
    const userId = Number.parseInt(formData.get("userId") as string)
    const specialization = formData.get("specialization") as string
    const qualification = formData.get("qualification") as string
    const experienceYears = Number.parseInt(formData.get("experienceYears") as string) || 0
    const registrationNumber = formData.get("registrationNumber") as string
    const consultationFee = Number.parseFloat(formData.get("consultationFee") as string) || 0
    const bio = formData.get("bio") as string
    const languagesSpoken = JSON.parse(formData.get("languagesSpoken") as string)
    const availableDays = JSON.parse(formData.get("availableDays") as string)
    const availableHours = JSON.parse(formData.get("availableHours") as string)

    // Extract files
    const govtId = formData.get("govtId") as File
    const degreeCertificate = formData.get("degreeCertificate") as File
    const registrationCertificate = formData.get("registrationCertificate") as File
    const experienceCertificate = formData.get("experienceCertificate") as File

    // Validation
    if (!specialization || !qualification || !registrationNumber) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 })
    }

    if (!govtId || !degreeCertificate || !registrationCertificate) {
      return NextResponse.json({ error: "Required documents are missing" }, { status: 400 })
    }

    // Check if doctor profile already exists
    const existingProfile = await executeQuery("SELECT id FROM doctor_profiles WHERE user_id = ?", [userId])

    if (Array.isArray(existingProfile) && existingProfile.length > 0) {
      return NextResponse.json({ error: "Doctor profile already exists" }, { status: 409 })
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "doctors", userId.toString())
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Save files
    const documentPaths: Record<string, string> = {}

    const saveFile = async (file: File, prefix: string) => {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const fileName = `${prefix}_${Date.now()}_${file.name}`
        const filePath = join(uploadsDir, fileName)
        await writeFile(filePath, buffer)
        return `/uploads/doctors/${userId}/${fileName}`
      }
      return null
    }

    documentPaths.govtId = await saveFile(govtId, "govt_id")
    documentPaths.degreeCertificate = await saveFile(degreeCertificate, "degree")
    documentPaths.registrationCertificate = await saveFile(registrationCertificate, "registration")

    if (experienceCertificate && experienceCertificate.size > 0) {
      documentPaths.experienceCertificate = await saveFile(experienceCertificate, "experience")
    }

    // Insert doctor profile
    const insertQuery = `
      INSERT INTO doctor_profiles (
        user_id, specialization, qualification, experience_years, registration_number,
        consultation_fee, bio, languages_spoken, available_days, available_hours,
        govt_id_document, degree_certificate, registration_certificate, experience_certificate,
        verification_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `

    const params = [
      userId,
      specialization,
      qualification,
      experienceYears,
      registrationNumber,
      consultationFee,
      bio,
      JSON.stringify(languagesSpoken),
      JSON.stringify(availableDays),
      JSON.stringify(availableHours),
      documentPaths.govtId,
      documentPaths.degreeCertificate,
      documentPaths.registrationCertificate,
      documentPaths.experienceCertificate || null,
    ]

    const result = await executeQuery(insertQuery, params)

    return NextResponse.json(
      {
        message: "Verification documents submitted successfully",
        profileId: (result as any).insertId,
        status: "pending",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Doctor verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get doctor profile
    const query = `
      SELECT dp.*, u.first_name, u.last_name, u.email, u.phone
      FROM doctor_profiles dp
      JOIN users u ON dp.user_id = u.id
      WHERE dp.user_id = ?
    `

    const result = await executeQuery(query, [user.id])

    if (!Array.isArray(result) || result.length === 0) {
      return NextResponse.json({ error: "Doctor profile not found" }, { status: 404 })
    }

    const profile = result[0] as any

    return NextResponse.json({
      profile: {
        id: profile.id,
        userId: profile.user_id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
        phone: profile.phone,
        specialization: profile.specialization,
        qualification: profile.qualification,
        experienceYears: profile.experience_years,
        registrationNumber: profile.registration_number,
        consultationFee: profile.consultation_fee,
        bio: profile.bio,
        languagesSpoken: JSON.parse(profile.languages_spoken || "[]"),
        availableDays: JSON.parse(profile.available_days || "[]"),
        availableHours: JSON.parse(profile.available_hours || "{}"),
        verificationStatus: profile.verification_status,
        verifiedAt: profile.verified_at,
        rejectionReason: profile.rejection_reason,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
      },
    })
  } catch (error) {
    console.error("Get doctor profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
