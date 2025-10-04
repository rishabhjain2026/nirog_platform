const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirog-platform';

async function setupMongoDB() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('nirog-platform');
    
    // Create collections with validation
    const collections = [
      'users',
      'doctor_profiles', 
      'hospitals',
      'labs',
      'pharmacies',
      'health_records',
      'appointments',
      'learning_resources',
      'quiz_questions',
      'quiz_attempts',
      'translation_cache',
      'user_sessions',
      'otp_verifications'
    ];
    
    for (const collectionName of collections) {
      try {
        await db.createCollection(collectionName);
        console.log(`Created collection: ${collectionName}`);
      } catch (error) {
        if (error.code === 48) { // Collection already exists
          console.log(`Collection ${collectionName} already exists`);
        } else {
          console.error(`Error creating collection ${collectionName}:`, error);
        }
      }
    }
    
    // Create indexes for better performance
    const indexes = [
      // Users collection indexes
      { collection: 'users', index: { email: 1 }, options: { unique: true } },
      { collection: 'users', index: { phone: 1 }, options: { unique: true } },
      { collection: 'users', index: { role: 1 } },
      { collection: 'users', index: { isActive: 1 } },
      
      // Doctor profiles indexes
      { collection: 'doctor_profiles', index: { userId: 1 }, options: { unique: true } },
      { collection: 'doctor_profiles', index: { specialization: 1 } },
      { collection: 'doctor_profiles', index: { verificationStatus: 1 } },
      { collection: 'doctor_profiles', index: { registrationNumber: 1 }, options: { unique: true } },
      
      // OTP verifications indexes
      { collection: 'otp_verifications', index: { phone: 1, purpose: 1 } },
      { collection: 'otp_verifications', index: { expiresAt: 1 }, options: { expireAfterSeconds: 0 } },
      
      // User sessions indexes
      { collection: 'user_sessions', index: { sessionToken: 1 }, options: { unique: true } },
      { collection: 'user_sessions', index: { userId: 1 } },
      { collection: 'user_sessions', index: { expiresAt: 1 }, options: { expireAfterSeconds: 0 } },
      
      // Appointments indexes
      { collection: 'appointments', index: { patientId: 1 } },
      { collection: 'appointments', index: { doctorId: 1 } },
      { collection: 'appointments', index: { appointmentDate: 1 } },
      
      // Health records indexes
      { collection: 'health_records', index: { patientId: 1 } },
      
      // Location-based indexes
      { collection: 'hospitals', index: { latitude: 1, longitude: 1 } },
      { collection: 'labs', index: { latitude: 1, longitude: 1 } },
      { collection: 'pharmacies', index: { latitude: 1, longitude: 1 } },
    ];
    
    for (const { collection, index, options = {} } of indexes) {
      try {
        await db.collection(collection).createIndex(index, options);
        console.log(`Created index on ${collection}:`, index);
      } catch (error) {
        console.error(`Error creating index on ${collection}:`, error);
      }
    }
    
    console.log('MongoDB setup completed successfully!');
    
  } catch (error) {
    console.error('Error setting up MongoDB:', error);
  } finally {
    await client.close();
  }
}

setupMongoDB();
