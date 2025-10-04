-- Nirog Healthcare Platform Database Schema
-- MySQL Database Setup for existing 'nirog' database
-- Removed database creation commands and updated to work with existing database

-- Use the existing nirog database
USE nirog;

-- Check if tables exist before creating them
-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('patient', 'doctor', 'student', 'admin') NOT NULL DEFAULT 'patient',
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  gender ENUM('male', 'female', 'other'),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  profile_image VARCHAR(255),
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Doctor profiles with verification details
CREATE TABLE IF NOT EXISTS doctor_profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  specialization VARCHAR(200) NOT NULL,
  qualification VARCHAR(500) NOT NULL,
  experience_years INT NOT NULL,
  registration_number VARCHAR(100) UNIQUE NOT NULL,
  consultation_fee DECIMAL(10,2),
  bio TEXT,
  languages_spoken JSON,
  
  -- Verification documents
  govt_id_document VARCHAR(255),
  degree_certificate VARCHAR(255),
  registration_certificate VARCHAR(255),
  experience_certificate VARCHAR(255),
  
  -- Verification status
  verification_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  verified_at TIMESTAMP NULL,
  verified_by INT NULL,
  rejection_reason TEXT,
  
  -- Availability
  available_days JSON, -- ["monday", "tuesday", ...]
  available_hours JSON, -- {"start": "09:00", "end": "17:00"}
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (verified_by) REFERENCES users(id)
);

-- Hospitals table
CREATE TABLE IF NOT EXISTS hospitals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name_en VARCHAR(255) NOT NULL,
  name_hi VARCHAR(255),
  name_ta VARCHAR(255),
  address_en TEXT NOT NULL,
  address_hi TEXT,
  address_ta TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timings_en VARCHAR(255),
  timings_hi VARCHAR(255),
  timings_ta VARCHAR(255),
  services_en TEXT,
  services_hi TEXT,
  services_ta TEXT,
  image_url VARCHAR(255),
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Labs table
CREATE TABLE IF NOT EXISTS labs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name_en VARCHAR(255) NOT NULL,
  name_hi VARCHAR(255),
  name_ta VARCHAR(255),
  address_en TEXT NOT NULL,
  address_hi TEXT,
  address_ta TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timings_en VARCHAR(255),
  timings_hi VARCHAR(255),
  timings_ta VARCHAR(255),
  services_en TEXT,
  services_hi TEXT,
  services_ta TEXT,
  test_categories JSON, -- ["pathology", "radiology", "cardiology"]
  image_url VARCHAR(255),
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Pharmacies table
CREATE TABLE IF NOT EXISTS pharmacies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name_en VARCHAR(255) NOT NULL,
  name_hi VARCHAR(255),
  name_ta VARCHAR(255),
  address_en TEXT NOT NULL,
  address_hi TEXT,
  address_ta TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timings_en VARCHAR(255),
  timings_hi VARCHAR(255),
  timings_ta VARCHAR(255),
  services_en TEXT,
  services_hi TEXT,
  services_ta TEXT,
  has_home_delivery BOOLEAN DEFAULT FALSE,
  image_url VARCHAR(255),
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Patient health records
CREATE TABLE IF NOT EXISTS health_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  record_type ENUM('report', 'prescription', 'scan', 'other') NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size INT NOT NULL,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  shared_with JSON, -- Array of doctor IDs who can access this record
  is_private BOOLEAN DEFAULT TRUE,
  
  FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration_minutes INT DEFAULT 30,
  consultation_type ENUM('online', 'offline') NOT NULL,
  status ENUM('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show') DEFAULT 'scheduled',
  consultation_fee DECIMAL(10,2),
  notes TEXT,
  prescription TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Learning resources
CREATE TABLE IF NOT EXISTS learning_resources (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title_en VARCHAR(255) NOT NULL,
  title_hi VARCHAR(255),
  title_ta VARCHAR(255),
  description_en TEXT,
  description_hi TEXT,
  description_ta TEXT,
  content_type ENUM('video', 'pdf', 'article', 'quiz') NOT NULL,
  file_path VARCHAR(255),
  video_url VARCHAR(255),
  thumbnail_url VARCHAR(255),
  category VARCHAR(100) NOT NULL,
  tags JSON,
  difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
  duration_minutes INT,
  uploaded_by INT NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  views_count INT DEFAULT 0,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Quiz questions for learning resources
CREATE TABLE IF NOT EXISTS quiz_questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  resource_id INT NOT NULL,
  question_en TEXT NOT NULL,
  question_hi TEXT,
  question_ta TEXT,
  options_en JSON NOT NULL, -- Array of options
  options_hi JSON,
  options_ta JSON,
  correct_answer INT NOT NULL, -- Index of correct option (0-based)
  explanation_en TEXT,
  explanation_hi TEXT,
  explanation_ta TEXT,
  question_order INT DEFAULT 0,
  
  FOREIGN KEY (resource_id) REFERENCES learning_resources(id) ON DELETE CASCADE
);

-- User quiz attempts
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  resource_id INT NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  total_questions INT NOT NULL,
  correct_answers INT NOT NULL,
  time_taken_minutes INT,
  answers JSON, -- Array of user's answers
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (resource_id) REFERENCES learning_resources(id) ON DELETE CASCADE
);

-- Translation cache for dynamic content
CREATE TABLE IF NOT EXISTS translation_cache (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content_hash VARCHAR(64) NOT NULL,
  source_language VARCHAR(5) NOT NULL,
  target_language VARCHAR(5) NOT NULL,
  original_text TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_translation (content_hash, source_language, target_language)
);

-- User sessions for authentication
CREATE TABLE IF NOT EXISTS user_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- OTP verification for phone numbers
CREATE TABLE IF NOT EXISTS otp_verifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  phone VARCHAR(20) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  purpose ENUM('registration', 'login', 'password_reset') NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  attempts INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_doctor_profiles_user_id ON doctor_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_doctor_profiles_specialization ON doctor_profiles(specialization);
CREATE INDEX IF NOT EXISTS idx_doctor_profiles_verification_status ON doctor_profiles(verification_status);
CREATE INDEX IF NOT EXISTS idx_hospitals_location ON hospitals(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_labs_location ON labs(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_pharmacies_location ON pharmacies(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_health_records_patient_id ON health_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_learning_resources_category ON learning_resources(category);
CREATE INDEX IF NOT EXISTS idx_learning_resources_uploaded_by ON learning_resources(uploaded_by);
