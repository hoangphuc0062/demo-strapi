/**
 * khach-hang service
 */

import { factories } from '@strapi/strapi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default factories.createCoreService('api::khach-hang.khach-hang' as any, ({ strapi }) => ({
    // Tìm khách hàng theo email
    async findByEmail(email: string) {
        return await strapi.entityService.findMany('api::khach-hang.khach-hang' as any, {
            filters: { email } as any,
            limit: 1,
        });
    },

    // Validate password
    async validatePassword(plainPassword: string, hashedPassword: string) {
        return bcrypt.compare(plainPassword, hashedPassword);
    },

    // Hash password
    async hashPassword(password: string) {
        return bcrypt.hash(password, 12);
    },

    // Get JWT secret từ Strapi config hoặc fallback
    getJWTSecret() {
        // Thử lấy từ Strapi config
        try {
            return strapi.config.get('server.app.keys[0]') || 'demo-strapi-jwt-secret-key-2024';
        } catch (error) {
            return 'demo-strapi-jwt-secret-key-2024';
        }
    },

    // Tạo JWT token
    generateJWT(khachHang: any) {
        const secret = this.getJWTSecret();
        return jwt.sign(
            {
                id: khachHang.id,
                email: khachHang.email,
                type: 'khach-hang'
            },
            secret as any,
            { expiresIn: '7d' }
        );
    },

    // Register khách hàng mới
    async register(data: any) {
        // Kiểm tra email đã tồn tại
        const existingUsers = await this.findByEmail(data.email);
        if (existingUsers && existingUsers.length > 0) {
            throw new Error('Email đã tồn tại');
        }

        // Hash password
        const hashedPassword = await this.hashPassword(data.matKhau);

        // Tạo khách hàng mới
        const khachHang = await strapi.entityService.create('api::khach-hang.khach-hang' as any, {
            data: {
                ...data,
                matKhau: hashedPassword,
                laXacThuc: false,
                laCam: false,
                publishedAt: new Date(),
            },
        });

        // Tạo token
        const token = this.generateJWT(khachHang as any);

        return { khachHang, token };
    },

    // Login khách hàng
    async login(email: string, password: string) {
        console.log('🔍 Login attempt for:', email);

        const khachHangs = await this.findByEmail(email as any);

        if (!khachHangs || khachHangs.length === 0) {
            throw new Error('Email không tồn tại');
        }

        const khachHang = khachHangs[0];

        console.log('🔍 Found user:', {
            id: khachHang.id,
            email: khachHang.email,
            passwordHash: khachHang.matKhau?.substring(0, 10) + '...', // Log first 10 chars for debugging
            passwordLength: khachHang.matKhau?.length,
            isHashedPassword: khachHang.matKhau?.startsWith('$2')
        });

        if (khachHang.laCam) {
            throw new Error('Tài khoản đã bị cấm');
        }

        // Check if password in DB is already hashed or plain text
        const isPasswordHashed = khachHang.matKhau?.startsWith('$2'); // bcrypt hashes start with $2

        let isValidPassword = false;

        if (isPasswordHashed) {
            // Password is hashed, use bcrypt compare
            console.log('🔍 Comparing hashed password with bcrypt');
            isValidPassword = await this.validatePassword(password as any, khachHang.matKhau);
        } else {
            // Password is plain text (old data), compare directly and then update
            console.log('🔍 Found plain text password, comparing directly');
            isValidPassword = password === khachHang.matKhau;

            // If valid, hash the password and update in DB
            if (isValidPassword) {
                console.log('🔄 Updating plain text password to hashed password');
                const hashedPassword = await this.hashPassword(password as any);
                await strapi.entityService.update('api::khach-hang.khach-hang' as any, khachHang.id, {
                    data: { matKhau: hashedPassword }
                });
            }
        }

        console.log('🔍 Password validation result:', isValidPassword);

        if (!isValidPassword) {
            throw new Error('Mật khẩu không đúng');
        }

        // Tạo token
        const token = this.generateJWT(khachHang as any);

        // Remove password from response
        const { matKhau, ...khachHangData } = khachHang as any;

        return { khachHang: khachHangData, token };
    },

    // Verify JWT token
    async verifyToken(token: string) {
        try {
            const secret = this.getJWTSecret();
            const decoded = jwt.verify(token, secret as any);
            return decoded;
        } catch (error) {
            throw new Error('Token không hợp lệ');
        }
    },

    // Get profile by token
    async getProfile(token: string) {
        const decoded = await this.verifyToken(token) as any;

        const khachHang = await strapi.entityService.findOne('api::khach-hang.khach-hang' as any, decoded.id);

        if (!khachHang) {
            throw new Error('Khách hàng không tồn tại');
        }

        const { matKhau, ...khachHangData } = khachHang as any;
        return khachHangData;
    },
}));
