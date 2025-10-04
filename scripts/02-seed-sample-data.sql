-- Sample data for Nirog Healthcare Platform
-- This script populates the database with sample hospitals, labs, and pharmacies

-- Insert sample hospitals in Bhopal and nearby areas
INSERT INTO hospitals (name_en, address_en, phone, email, latitude, longitude, timings_en, services_en, rating, total_reviews) VALUES
('AIIMS Bhopal', 'Saket Nagar, Bhopal, Madhya Pradesh 462020', '+91-755-2672000', 'info@aiimsbhopal.edu.in', 23.2156, 77.4305, 'Mon-Sun: 24 Hours', 'Emergency Care, Cardiology, Neurology, Oncology, General Medicine', 4.5, 1250),
('Bansal Hospital', 'C Sector, Shahpura, Bhopal, Madhya Pradesh 462016', '+91-755-2661111', 'info@bansalhospital.com', 23.2599, 77.4126, 'Mon-Sun: 24 Hours', 'Multi-specialty, Emergency Care, ICU, Surgery', 4.3, 890),
('Chirayu Medical College Hospital', 'Bairagarh, Bhopal, Madhya Pradesh 462030', '+91-755-2497777', 'info@chirayumedical.com', 23.2967, 77.3667, 'Mon-Sun: 24 Hours', 'Medical Education, General Medicine, Surgery, Pediatrics', 4.2, 650),
('Peoples Hospital', 'Peoples Campus, Bhanpur, Bhopal, Madhya Pradesh 462037', '+91-755-2736100', 'info@peopleshospital.in', 23.1793, 77.4441, 'Mon-Sun: 24 Hours', 'Multi-specialty, Trauma Care, Cardiology, Orthopedics', 4.4, 720),
('Siddhanta Red Cross Hospital', 'Red Cross Bhawan, Shivaji Nagar, Bhopal, Madhya Pradesh 462016', '+91-755-2661234', 'info@redcrossbhopal.org', 23.2521, 77.4101, 'Mon-Sun: 24 Hours', 'Emergency Care, Blood Bank, General Medicine, Surgery', 4.1, 480),
('Bhopal Memorial Hospital', 'Raisen Road, Bhopal, Madhya Pradesh 462038', '+91-755-2554455', 'info@bmhrc.in', 23.2156, 77.4389, 'Mon-Sun: 24 Hours', 'Research, Pulmonology, General Medicine, Rehabilitation', 4.0, 320),
('Hamidia Hospital', 'Sultania Road, Bhopal, Madhya Pradesh 462001', '+91-755-2540999', 'info@hamidiahospital.gov.in', 23.2685, 77.4064, 'Mon-Sun: 24 Hours', 'Government Hospital, General Medicine, Surgery, Emergency', 3.8, 950),
('Max Hospital Bhopal', 'E-2, Arera Colony, Bhopal, Madhya Pradesh 462016', '+91-755-6629999', 'info@maxhealthcare.com', 23.2467, 77.4234, 'Mon-Sun: 24 Hours', 'Multi-specialty, Cardiology, Oncology, Neurology, ICU', 4.6, 1100);

-- Insert sample labs in Bhopal
INSERT INTO labs (name_en, address_en, phone, email, latitude, longitude, timings_en, services_en, test_categories, rating, total_reviews) VALUES
('SRL Diagnostics', 'MP Nagar, Bhopal, Madhya Pradesh 462011', '+91-755-2551234', 'bhopal@srldiagnostics.com', 23.2324, 77.4126, 'Mon-Sat: 7AM-7PM, Sun: 8AM-2PM', 'Pathology, Radiology, Cardiology Tests', '["pathology", "radiology", "cardiology"]', 4.3, 680),
('Dr. Lal PathLabs', 'Arera Colony, Bhopal, Madhya Pradesh 462016', '+91-755-2467890', 'bhopal@lalpathlabs.com', 23.2467, 77.4234, 'Mon-Sat: 6:30AM-8PM, Sun: 7AM-3PM', 'Blood Tests, Urine Tests, X-Ray, ECG', '["pathology", "radiology"]', 4.4, 520),
('Metropolis Healthcare', 'New Market, Bhopal, Madhya Pradesh 462001', '+91-755-2540567', 'bhopal@metropolisindia.com', 23.2685, 77.4064, 'Mon-Sat: 7AM-7PM, Sun: 8AM-1PM', 'Advanced Diagnostics, Molecular Tests, Imaging', '["pathology", "radiology", "molecular"]', 4.2, 390),
('Thyrocare', 'Shahpura, Bhopal, Madhya Pradesh 462016', '+91-755-2661890', 'bhopal@thyrocare.com', 23.2599, 77.4126, 'Mon-Sat: 6AM-10AM (Sample Collection)', 'Thyroid Tests, Diabetes Profile, Lipid Profile', '["pathology", "endocrinology"]', 4.1, 280),
('Ganesh Diagnostic Centre', 'Hamidia Road, Bhopal, Madhya Pradesh 462001', '+91-755-2542345', 'info@ganeshdiagnostic.com', 23.2685, 77.4064, 'Mon-Sat: 8AM-6PM, Sun: 9AM-2PM', 'CT Scan, MRI, Ultrasound, X-Ray', '["radiology", "imaging"]', 4.0, 210),
('Vijaya Diagnostic Centre', 'Kolar Road, Bhopal, Madhya Pradesh 462042', '+91-755-2734567', 'info@vijayahealth.com', 23.1867, 77.4456, 'Mon-Sat: 7AM-8PM, Sun: 8AM-3PM', 'Pathology, Radiology, Health Checkups', '["pathology", "radiology", "preventive"]', 4.2, 340);

-- Insert sample pharmacies in Bhopal
INSERT INTO pharmacies (name_en, address_en, phone, email, latitude, longitude, timings_en, services_en, has_home_delivery, rating, total_reviews) VALUES
('Apollo Pharmacy', 'MP Nagar Zone 1, Bhopal, Madhya Pradesh 462011', '+91-755-2551111', 'bhopal@apollopharmacy.in', 23.2324, 77.4126, 'Mon-Sun: 8AM-11PM', 'Prescription Medicines, OTC Drugs, Health Products', TRUE, 4.3, 450),
('MedPlus', 'Arera Colony, Bhopal, Madhya Pradesh 462016', '+91-755-2467777', 'bhopal@medplus.in', 23.2467, 77.4234, 'Mon-Sun: 8AM-10PM', 'Medicines, Healthcare Products, Online Orders', TRUE, 4.2, 380),
('Wellness Forever', 'New Market, Bhopal, Madhya Pradesh 462001', '+91-755-2540888', 'bhopal@wellnessforever.com', 23.2685, 77.4064, 'Mon-Sun: 9AM-10PM', 'Pharmacy, Wellness Products, Health Supplements', TRUE, 4.1, 290),
('Netmeds', 'Shahpura, Bhopal, Madhya Pradesh 462016', '+91-755-2661999', 'bhopal@netmeds.com', 23.2599, 77.4126, 'Mon-Sun: 24 Hours (Online)', 'Online Pharmacy, Home Delivery, Prescription Upload', TRUE, 4.4, 620),
('Guardian Pharmacy', 'Hamidia Road, Bhopal, Madhya Pradesh 462001', '+91-755-2542222', 'info@guardianpharmacy.com', 23.2685, 77.4064, 'Mon-Sun: 8AM-9PM', 'Medicines, Baby Care, Personal Care Products', FALSE, 4.0, 180),
('Dawai Dukan', 'Kolar Road, Bhopal, Madhya Pradesh 462042', '+91-755-2734444', 'info@dawaidukan.com', 23.1867, 77.4456, 'Mon-Sun: 7AM-11PM', 'Generic Medicines, Ayurvedic Products, Health Devices', TRUE, 3.9, 150),
('HealthKart Pharmacy', 'Bairagarh, Bhopal, Madhya Pradesh 462030', '+91-755-2497888', 'bhopal@healthkart.com', 23.2967, 77.3667, 'Mon-Sun: 9AM-9PM', 'Supplements, Fitness Products, Medicines', TRUE, 4.2, 320),
('Jan Aushadhi', 'Sultania Road, Bhopal, Madhya Pradesh 462001', '+91-755-2540777', 'info@janaushadhi.gov.in', 23.2685, 77.4064, 'Mon-Sat: 9AM-6PM', 'Generic Medicines, Affordable Healthcare', FALSE, 4.0, 240);

-- Insert some sample users for testing
INSERT INTO users (email, phone, password_hash, role, first_name, last_name, is_verified, is_active) VALUES
('admin@nirog.com', '7880113814', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', 'admin', 'Admin', 'User', TRUE, TRUE),
('doctor@nirog.com', '9876543210', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', 'doctor', 'Dr. Rajesh', 'Sharma', TRUE, TRUE),
('patient@nirog.com', '9876543211', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', 'patient', 'Priya', 'Singh', TRUE, TRUE),
('student@nirog.com', '9876543212', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', 'student', 'Amit', 'Kumar', TRUE, TRUE);

-- Insert sample doctor profile
INSERT INTO doctor_profiles (user_id, specialization, qualification, experience_years, registration_number, consultation_fee, bio, languages_spoken, verification_status, verified_at, available_days, available_hours) VALUES
(2, 'Cardiology', 'MBBS, MD (Cardiology), DM (Cardiology)', 15, 'MP12345', 800.00, 'Experienced cardiologist with expertise in interventional cardiology and heart disease prevention.', '["English", "Hindi"]', 'approved', NOW(), '["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]', '{"start": "09:00", "end": "17:00"}');
