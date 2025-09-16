import axios from 'axios';
import FormData from 'form-data';

// Test testimonial submission
const testTestimonialSubmission = async () => {
  try {
    console.log('Testing testimonial submission...');
    
    const formData = new FormData();
    formData.append('name', 'Test User');
    formData.append('email', 'test@example.com');
    formData.append('title', 'Great Experience with Pediatric Care');
    formData.append('treatment', 'Pediatric Care');
    formData.append('testimony', 'This is a test testimony to verify the endpoint is working correctly. The service was excellent and professional.');
    formData.append('rating', '5');
    
    const response = await axios.post('http://localhost:5000/api/testimonials', formData, {
      headers: {
        ...formData.getHeaders(),
      },
      timeout: 10000,
    });
    
    console.log('✅ Success:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    return false;
  }
};

// Test health endpoint
const testHealthEndpoint = async () => {
  try {
    console.log('Testing health endpoint...');
    const response = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Health check:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
};

// Run tests
const runTests = async () => {
  console.log('🚀 Starting testimonial endpoint tests...\n');
  
  const healthOk = await testHealthEndpoint();
  console.log('');
  
  if (healthOk) {
    await testTestimonialSubmission();
  } else {
    console.log('❌ Server is not responding. Please make sure the server is running on port 5000.');
  }
  
  console.log('\n✨ Tests completed.');
};

runTests();