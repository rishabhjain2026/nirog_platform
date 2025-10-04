import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { executeQuery } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "all"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    let whereClause = ""
    const params: any[] = []

    if (status !== "all") {
      whereClause = "WHERE dp.verification_status = ?"
      params.push(status)
    }

    const query = `
      SELECT dp.*, u.first_name, u.last_name, u.email, u.phone, u.created_at as user_created_at
      FROM doctor_profiles dp
      JOIN users u ON dp.user_id = u.id
      ${whereClause}
      ORDER BY dp.created_at DESC
      LIMIT ? OFFSET ?
    `

    params.push(limit, offset)

    const results = await executeQuery(query, params)

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM doctor_profiles dp
      JOIN users u ON dp.user_id = u.id
      ${whereClause}
    `

    const countParams = status !== "all" ? [status] : []
    const countResult = await executeQuery(countQuery, countParams)
    const total = Array.isArray(countResult) ? (countResult[0] as any).total : 0

    const doctors = Array.isArray(results)
      ? results.map((doctor: any) => ({
          id: doctor.id,
          userId: doctor.user_id,
          firstName: doctor.first_name,
          lastName: doctor.last_name,
          email: doctor.email,
          phone: doctor.phone,
          specialization: doctor.specialization,
          qualification: doctor.qualification,
          experienceYears: doctor.experience_years,
          registrationNumber: doctor.registration_number,
          consultationFee: doctor.consultation_fee,
          verificationStatus: doctor.verification_status,
          verifiedAt: doctor.verified_at,
          rejectionReason: doctor.rejection_reason,
          createdAt: doctor.created_at,
          userCreatedAt: doctor.user_created_at,
        }))
      : []

    return NextResponse.json({
      doctors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get doctors for admin error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
