const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nirog-platform';

async function checkUser() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('nirog-platform');
    
    // Find the test user
    const user = await db.collection('users').findOne({ email: 'test@example.com' });
    
    if (user) {
      console.log('User found:');
      console.log('Email:', user.email);
      console.log('Phone:', user.phone);
      console.log('Role:', user.role);
      console.log('Password Hash exists:', !!user.passwordHash);
      console.log('Password Hash length:', user.passwordHash ? user.passwordHash.length : 'N/A');
      console.log('Is Active:', user.isActive);
      console.log('Is Verified:', user.isVerified);
    } else {
      console.log('User not found');
    }
    
  } catch (error) {
    console.error('Error checking user:', error);
  } finally {
    await client.close();
  }
}

checkUser();
