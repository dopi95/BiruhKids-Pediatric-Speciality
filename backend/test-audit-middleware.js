import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuditLog from './src/models/AuditLog.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for audit test');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Test audit logging
const testAuditLogging = async () => {
  try {
    await connectDB();
    
    // Create a test audit log entry
    const testLog = new AuditLog({
      adminId: new mongoose.Types.ObjectId(),
      adminName: 'Test Admin',
      adminEmail: 'test@example.com',
      action: 'CREATE',
      resourceType: 'User',
      resourceId: 'test-user-id',
      resourceName: 'Test User',
      details: {
        method: 'POST',
        url: '/api/users/admin',
        ip: '127.0.0.1',
        userAgent: 'Test Agent'
      }
    });
    
    await testLog.save();
    console.log('✅ Test audit log created successfully:', testLog._id);
    
    // Fetch recent logs to verify
    const recentLogs = await AuditLog.find().sort({ createdAt: -1 }).limit(5);
    console.log('📋 Recent audit logs:');
    recentLogs.forEach(log => {
      console.log(`- ${log.adminName} ${log.action} ${log.resourceType} at ${log.createdAt}`);
    });
    
    console.log('🎉 Audit middleware test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

testAuditLogging();