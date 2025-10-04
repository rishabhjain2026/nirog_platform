const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirog-platform';

async function createTestUser() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('nirog-platform');
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('Test user already exists');
      return;
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash('Test123!', 12);
    
    // Create test user
    const testUser = {
      email: 'test@example.com',
      phone: '9876543210',
      passwordHash: passwordHash,
      role: 'patient',
      firstName: 'Test',
      lastName: 'User',
      isVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('users').insertOne(testUser);
    console.log('Test user created successfully:', result.insertedId);
    console.log('Email: test@example.com');
    console.log('Password: Test123!');
    
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await client.close();
  }
}

createTestUser();
