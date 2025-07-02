const axios = require('axios');

// Test GraphQL registerKhachHang mutation
async function testRegisterKhachHang() {
    const query = `
    mutation RegisterKhachHang($input: RegisterKhachHangInput!) {
      registerKhachHang(input: $input) {
        user {
          id
          email
          ho
          ten
          soDienThoai
          laXacThuc
          laCam
        }
        jwt
      }
    }
  `;

    const variables = {
        input: {
            email: "test@example.com",
            matKhau: "123456",
            ho: "Nguyen",
            ten: "Van A",
            soDienThoai: "0123456789"
        }
    };

    try {
        const response = await axios.post('http://localhost:8888/graphql', {
            query,
            variables
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ Success:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('❌ Error:', JSON.stringify(error.response?.data || error.message, null, 2));
    }
}

// Test GraphQL loginKhachHang mutation
async function testLoginKhachHang() {
    const query = `
    mutation LoginKhachHang($input: LoginKhachHangInput!) {
      loginKhachHang(input: $input) {
        user {
          id
          email
          ho
          ten
          soDienThoai
          laXacThuc
          laCam
        }
        jwt
      }
    }
  `;

    const variables = {
        input: {
            email: "test@example.com",
            matKhau: "123456"
        }
    };

    try {
        const response = await axios.post('http://localhost:8888/graphql', {
            query,
            variables
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ Login Success:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('❌ Login Error:', JSON.stringify(error.response?.data || error.message, null, 2));
    }
}

// Run tests
async function runTests() {
    console.log('🚀 Testing GraphQL mutations...\n');

    console.log('1. Testing registerKhachHang...');
    await testRegisterKhachHang();

    console.log('\n2. Testing loginKhachHang...');
    await testLoginKhachHang();
}

runTests().catch(console.error); 