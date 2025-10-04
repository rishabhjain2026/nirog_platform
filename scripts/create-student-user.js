const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirog-platform';

async function createStudentUser() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('nirog-platform');
    
    // Check if student user already exists
    const existingUser = await db.collection('users').findOne({ email: 'student@example.com' });
    if (existingUser) {
      console.log('Student user already exists');
      return;
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash('Student123!', 12);
    
    // Create student user
    const studentUser = {
      email: 'student@example.com',
      phone: '9876543211',
      passwordHash: passwordHash,
      role: 'student',
      firstName: 'Student',
      lastName: 'User',
      isVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('users').insertOne(studentUser);
    console.log('Student user created successfully:', result.insertedId);
    console.log('Email: student@example.com');
    console.log('Password: Student123!');
    
  } catch (error) {
    console.error('Error creating student user:', error);
  } finally {
    await client.close();
  }
}

createStudentUser();
