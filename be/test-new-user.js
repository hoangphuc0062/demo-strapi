const axios = require('axios');

async function testNewUser() {
    const timestamp = Date.now();
    const email = `newuser${timestamp}@example.com`;
    const password = '123456';

    console.log('🚀 Testing with new user:', email);

    // Test register
    try {
        const registerResponse = await axios.post('http://localhost:8888/api/khach-hang/auth/register', {
            email: email,
            matKhau: password,
            ho: 'Test',
            ten: 'User',
            soDienThoai: '0123456789'
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('✅ Register Success');
        console.log('Password hash:', registerResponse.data.data.khachHang.matKhau.substring(0, 20) + '...');
        console.log('Hash starts with $2:', registerResponse.data.data.khachHang.matKhau.startsWith('$2'));

        // Test login immediately
        console.log('\n🔄 Testing login with same credentials...');

        const loginResponse = await axios.post('http://localhost:8888/api/khach-hang/auth/login', {
            email: email,
            matKhau: password
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('✅ Login Success');
        console.log('Token received:', loginResponse.data.data.token ? 'Yes' : 'No');

        return true;

    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
        return false;
    }
}

testNewUser().catch(console.error); 