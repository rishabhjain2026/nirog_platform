import { getDatabase, testConnection as testMongoConnection } from './mongodb'
import { User, OTPVerification, UserSession } from './models'
import { ObjectId } from 'mongodb'



export async function getUserByEmail(email: string) {
  try {
    const db = await getDatabase()
    const user = await db.collection('users').findOne({ 
      email: email, 
      isActive: true 
    })
    return user
  } catch (error) {
    console.error("Error getting user by email:", error)
    throw error
  }
}

export async function getUserByPhone(phone: string) {
  try {
    const db = await getDatabase()
    const user = await db.collection('users').findOne({ 
      phone: phone, 
      isActive: true 
    })
    return user
  } catch (error) {
    console.error("Error getting user by phone:", error)
    throw error
  }
}

export async function createUser(userData: {
  email: string
  phone: string
  passwordHash: string
  role: string
  firstName: string
  lastName: string
}) {
  try {
    const db = await getDatabase()
    const now = new Date()
    
    const newUser: User = {
      email: userData.email,
      phone: userData.phone,
      passwordHash: userData.passwordHash,
      role: userData.role as 'patient' | 'doctor' | 'student' | 'admin',
      firstName: userData.firstName,
      lastName: userData.lastName,
      isVerified: false,
      isActive: true,
      createdAt: now,
      updatedAt: now
    }

    const result = await db.collection('users').insertOne(newUser)
    return { ...newUser, _id: result.insertedId }
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export async function storeOTP(phone: string, otpCode: string, purpose: string) {
  try {
    const db = await getDatabase()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 10 * 60 * 1000) // 10 minutes from now

    // Delete any existing OTP for this phone and purpose
    await db.collection('otp_verifications').deleteMany({ 
      phone: phone, 
      purpose: purpose as 'registration' | 'login' | 'password_reset' 
    })

    // Store new OTP
    const otpRecord: OTPVerification = {
      phone,
      otpCode,
      purpose: purpose as 'registration' | 'login' | 'password_reset',
      expiresAt,
      isVerified: false,
      attempts: 0,
      createdAt: now
    }

    const result = await db.collection('otp_verifications').insertOne(otpRecord)
    return { ...otpRecord, _id: result.insertedId }
  } catch (error) {
    console.error("Error storing OTP:", error)
    throw error
  }
}

export async function verifyOTP(phone: string, otpCode: string, purpose: string) {
  try {
    const db = await getDatabase()
    
    // Find the most recent unverified OTP for this phone and purpose
    const otpRecord = await db.collection('otp_verifications').findOne({
      phone: phone,
      purpose: purpose as 'registration' | 'login' | 'password_reset',
      isVerified: false
    }, {
      sort: { createdAt: -1 }
    })

    if (!otpRecord) {
      return { success: false, message: "OTP not found or already verified" }
    }

    // Check if OTP has expired
    if (new Date() > otpRecord.expiresAt) {
      return { success: false, message: "OTP has expired" }
    }

    // Check if too many attempts
    if (otpRecord.attempts >= 3) {
      return { success: false, message: "Too many failed attempts" }
    }

    // Verify OTP
    if (otpRecord.otpCode !== otpCode) {
      // Increment attempts
      await db.collection('otp_verifications').updateOne(
        { _id: otpRecord._id },
        { $inc: { attempts: 1 } }
      )
      return { success: false, message: "Invalid OTP" }
    }

    // Mark OTP as verified
    await db.collection('otp_verifications').updateOne(
      { _id: otpRecord._id },
      { $set: { isVerified: true } }
    )

    return { success: true, message: "OTP verified successfully" }
  } catch (error) {
    console.error("Error verifying OTP:", error)
    throw error
  }
}

export async function createUserSession(userId: string, sessionToken: string) {
  try {
    const db = await getDatabase()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days from now

    const session: UserSession = {
      userId: new ObjectId(userId),
      sessionToken,
      expiresAt,
      createdAt: now
    }

    const result = await db.collection('user_sessions').insertOne(session)
    return { ...session, _id: result.insertedId }
  } catch (error) {
    console.error("Error creating user session:", error)
    throw error
  }
}

export async function deleteUserSession(sessionToken: string) {
  try {
    const db = await getDatabase()
    const result = await db.collection('user_sessions').deleteOne({ sessionToken })
    return result
  } catch (error) {
    console.error("Error deleting user session:", error)
    throw error
  }
}

// Test MongoDB connection
export async function testConnection() {
  try {
    await testMongoConnection()
  } catch (error) {
    console.error("MongoDB connection test failed:", error)
    throw error
  }
}

// Initialize database connection
testConnection()
