import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  email: string
  phone: string
  passwordHash: string
  role: 'patient' | 'doctor' | 'student' | 'admin'
  firstName: string
  lastName: string
  dateOfBirth?: Date
  gender?: 'male' | 'female' | 'other'
  address?: string
  city?: string
  state?: string
  pincode?: string
  profileImage?: string
  isVerified: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface DoctorProfile {
  _id?: ObjectId
  userId: ObjectId
  specialization: string
  qualification: string
  experienceYears: number
  registrationNumber: string
  consultationFee?: number
  bio?: string
  languagesSpoken?: string[]
  
  // Verification documents
  govtIdDocument?: string
  degreeCertificate?: string
  registrationCertificate?: string
  experienceCertificate?: string
  
  // Verification status
  verificationStatus: 'pending' | 'approved' | 'rejected'
  verifiedAt?: Date
  verifiedBy?: ObjectId
  rejectionReason?: string
  
  // Availability
  availableDays?: string[]
  availableHours?: {
    start: string
    end: string
  }
  
  createdAt: Date
  updatedAt: Date
}

export interface OTPVerification {
  _id?: ObjectId
  phone: string
  otpCode: string
  purpose: 'registration' | 'login' | 'password_reset'
  expiresAt: Date
  isVerified: boolean
  attempts: number
  createdAt: Date
}

export interface UserSession {
  _id?: ObjectId
  userId: ObjectId
  sessionToken: string
  expiresAt: Date
  createdAt: Date
}

export interface HealthRecord {
  _id?: ObjectId
  patientId: ObjectId
  title: string
  description?: string
  recordType: 'report' | 'prescription' | 'scan' | 'other'
  filePath: string
  fileType: string
  fileSize: number
  uploadDate: Date
  sharedWith?: ObjectId[]
  isPrivate: boolean
}

export interface Appointment {
  _id?: ObjectId
  patientId: ObjectId
  doctorId: ObjectId
  appointmentDate: Date
  appointmentTime: string
  durationMinutes: number
  consultationType: 'online' | 'offline'
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
  consultationFee?: number
  notes?: string
  prescription?: string
  createdAt: Date
  updatedAt: Date
}

export interface Hospital {
  _id?: ObjectId
  nameEn: string
  nameHi?: string
  nameTa?: string
  addressEn: string
  addressHi?: string
  addressTa?: string
  phone?: string
  email?: string
  website?: string
  latitude?: number
  longitude?: number
  timingsEn?: string
  timingsHi?: string
  timingsTa?: string
  servicesEn?: string
  servicesHi?: string
  servicesTa?: string
  imageUrl?: string
  rating: number
  totalReviews: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Lab {
  _id?: ObjectId
  nameEn: string
  nameHi?: string
  nameTa?: string
  addressEn: string
  addressHi?: string
  addressTa?: string
  phone?: string
  email?: string
  website?: string
  latitude?: number
  longitude?: number
  timingsEn?: string
  timingsHi?: string
  timingsTa?: string
  servicesEn?: string
  servicesHi?: string
  servicesTa?: string
  testCategories?: string[]
  imageUrl?: string
  rating: number
  totalReviews: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Pharmacy {
  _id?: ObjectId
  nameEn: string
  nameHi?: string
  nameTa?: string
  addressEn: string
  addressHi?: string
  addressTa?: string
  phone?: string
  email?: string
  website?: string
  latitude?: number
  longitude?: number
  timingsEn?: string
  timingsHi?: string
  timingsTa?: string
  servicesEn?: string
  servicesHi?: string
  servicesTa?: string
  hasHomeDelivery: boolean
  imageUrl?: string
  rating: number
  totalReviews: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
