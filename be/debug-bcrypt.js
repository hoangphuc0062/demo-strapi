const bcrypt = require('bcryptjs');

async function debugBcrypt() {
    const plainPassword = '123456';

    console.log('🔍 Testing bcrypt...');
    console.log('Plain password:', plainPassword);

    // Test hash
    const hashed = await bcrypt.hash(plainPassword, 12);
    console.log('Hashed password:', hashed);
    console.log('Hash length:', hashed.length);
    console.log('Starts with $2:', hashed.startsWith('$2'));

    // Test compare
    const isValid1 = await bcrypt.compare(plainPassword, hashed);
    console.log('Compare result (should be true):', isValid1);

    // Test compare with wrong password
    const isValid2 = await bcrypt.compare('wrongpassword', hashed);
    console.log('Compare with wrong password (should be false):', isValid2);

    // Test with the actual hash from the register result
    const actualHash = '$2a$10$z0X5ws4TUCnP9EqMiX910e.ffh7IjI0ALKWM/X6dNuOD1tH9KcCMu';
    const isValid3 = await bcrypt.compare(plainPassword, actualHash);
    console.log('Compare with actual hash from DB (should be true):', isValid3);
}

debugBcrypt().catch(console.error); 