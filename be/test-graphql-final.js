const axios = require('axios');

async function testGraphQLAfterFix() {
    const timestamp = Date.now();
    const email = `graphql${timestamp}@example.com`;
    const password = '123456';

    console.log('🚀 Testing GraphQL with new user:', email);

    // Test GraphQL registerKhachHang
    const registerQuery = `
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

    const registerVariables = {
        input: {
            email: email,
            matKhau: password,
            ho: 'GraphQL',
            ten: 'User',
            soDienThoai: '0987654321'
        }
    };

    try {
        console.log('\n1. Testing GraphQL Register...');
        const registerResponse = await axios.post('http://localhost:8888/graphql', {
            query: registerQuery,
            variables: registerVariables
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (registerResponse.data.errors) {
            console.log('❌ Register Errors:', JSON.stringify(registerResponse.data.errors, null, 2));
            return;
        }

        console.log('✅ Register Success!');
        console.log('User ID:', registerResponse.data.data.registerKhachHang.user.id);
        console.log('JWT received:', registerResponse.data.data.registerKhachHang.jwt ? 'Yes' : 'No');

        // Test GraphQL loginKhachHang
        console.log('\n2. Testing GraphQL Login...');

        const loginQuery = `
      mutation LoginKhachHang($input: LoginKhachHangInput!) {
        loginKhachHang(input: $input) {
          user {
            id
            email
            ho
            ten
          }
          jwt
        }
      }
    `;

        const loginVariables = {
            input: {
                email: email,
                matKhau: password
            }
        };

        const loginResponse = await axios.post('http://localhost:8888/graphql', {
            query: loginQuery,
            variables: loginVariables
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (loginResponse.data.errors) {
            console.log('❌ Login Errors:', JSON.stringify(loginResponse.data.errors, null, 2));
            return;
        }

        console.log('✅ Login Success!');
        console.log('User email:', loginResponse.data.data.loginKhachHang.user.email);
        console.log('JWT received:', loginResponse.data.data.loginKhachHang.jwt ? 'Yes' : 'No');

        console.log('\n🎉 All tests passed! Password issue fixed!');

    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
    }
}

testGraphQLAfterFix().catch(console.error); 