const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testLogin() {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: 'student@example.com',
        password: 'Student123!'
      })
    });

    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('User role:', data.user.role);
      console.log('Redirect should go to:', data.user.role === 'student' ? '/dashboard/student' : '/dashboard/patient');
      
      // Test the dashboard page
      console.log('\n🔍 Testing dashboard page...');
      const dashboardResponse = await fetch(`http://localhost:3000/dashboard/${data.user.role}`);
      console.log('Dashboard status:', dashboardResponse.status);
      if (dashboardResponse.status === 200) {
        console.log('✅ Dashboard page loads successfully!');
      } else {
        console.log('❌ Dashboard page failed to load');
      }
    } else {
      console.log('❌ Login failed');
    }
    
  } catch (error) {
    console.error('Error testing login:', error);
  }
}

testLogin();
