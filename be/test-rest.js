const axios = require('axios');

// Test REST API register endpoint
async function testRestRegister() {
    const data = {
        email: "rest-test@example.com",
        matKhau: "123456",
        ho: "REST",
        ten: "User",
        soDienThoai: "0987654321"
    };

    try {
        const response = await axios.post('http://localhost:8888/api/khach-hang/auth/register', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ REST Register Success:', JSON.stringify(response.data, null, 2));
        return response.data.data?.token; // Return token for login test
    } catch (error) {
        console.error('❌ REST Register Error:', JSON.stringify(error.response?.data || error.message, null, 2));
        return null;
    }
}

// Test REST API login endpoint
async function testRestLogin() {
    const data = {
        email: "rest-test@example.com",
        matKhau: "123456"
    };

    try {
        const response = await axios.post('http://localhost:8888/api/khach-hang/auth/login', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ REST Login Success:', JSON.stringify(response.data, null, 2));
        return response.data.data?.token; // Return token for profile test
    } catch (error) {
        console.error('❌ REST Login Error:', JSON.stringify(error.response?.data || error.message, null, 2));
        return null;
    }
}

// Test REST API profile endpoint
async function testRestProfile(token) {
    if (!token) {
        console.log('⚠️  No token available for profile test');
        return;
    }

    try {
        const response = await axios.get('http://localhost:8888/api/khach-hang/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ REST Profile Success:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('❌ REST Profile Error:', JSON.stringify(error.response?.data || error.message, null, 2));
    }
}

// Run REST tests
async function runRestTests() {
    console.log('🚀 Testing REST API endpoints...\n');

    console.log('1. Testing REST register...');
    const registerToken = await testRestRegister();

    console.log('\n2. Testing REST login...');
    const loginToken = await testRestLogin();

    console.log('\n3. Testing REST profile...');
    await testRestProfile(loginToken || registerToken);
}

runRestTests().catch(console.error); 