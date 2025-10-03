import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuditService from './src/utils/auditService.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for audit API test');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const testAuditAPI = async () => {
  try {
    await connectDB();
    
    console.log('🧪 Testing Audit API endpoints...\n');
    
    // Test getLogs with filters
    console.log('📋 Testing getLogs...');
    const logsResult = await AuditService.getLogs({
      page: 1,
      limit: 5,
      action: 'CREATE'
    });
    console.log(`✅ Found ${logsResult.logs.length} logs, total: ${logsResult.pagination.total}`);
    
    // Test getStats
    console.log('\n📊 Testing getStats...');
    const stats = await AuditService.getStats();
    console.log(`✅ Stats: ${stats.totalLogs} total, ${stats.todayLogs} today`);
    console.log(`   Actions: ${stats.actionStats.length} types`);
    console.log(`   Resources: ${stats.resourceStats.length} types`);
    
    // Test search functionality
    console.log('\n🔍 Testing search...');
    const searchResult = await AuditService.getLogs({
      page: 1,
      limit: 5,
      search: 'Test'
    });
    console.log(`✅ Search found ${searchResult.logs.length} logs`);
    
    console.log('\n🎉 All audit API tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

testAuditAPI();