# MongoDB Setup Instructions

## Prerequisites
1. Install MongoDB on your system
2. Start MongoDB service

## Environment Variables
Create a `.env.local` file in the root directory with the following content:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/nirog-platform
DATABASE_URL=mongodb://localhost:27017/nirog-platform

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-change-this-in-production
```

## Setup Steps

1. **Install dependencies** (already done):
   ```bash
   npm install mongodb mongoose
   ```

2. **Start MongoDB**:
   - On Windows: Start MongoDB service or run `mongod`
   - On macOS: `brew services start mongodb-community`
   - On Linux: `sudo systemctl start mongod`

3. **Setup MongoDB collections and indexes**:
   ```bash
   npm run setup-mongodb
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## What Changed

- Migrated from PostgreSQL/MySQL to MongoDB
- Updated all database functions to use MongoDB syntax
- Created proper TypeScript models for MongoDB documents
- Added indexes for better performance
- Fixed the signup functionality to work with MongoDB

The signup button should now work without internal server errors!
