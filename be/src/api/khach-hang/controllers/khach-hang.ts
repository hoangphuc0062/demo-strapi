/**
 * khach-hang controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::khach-hang.khach-hang' as any, ({ strapi }) => ({
    // Custom login endpoint
    async login(ctx) {
        try {
            const { email, matKhau } = ctx.request.body;
            console.log(email, matKhau);
            if (!email || !matKhau) {
                return ctx.badRequest('Email và mật khẩu là bắt buộc');
            }

            const result = await strapi.service('api::khach-hang.khach-hang').login(email, matKhau);

            ctx.send({
                message: 'Đăng nhập thành công',
                data: result,
            });
        } catch (error) {
            ctx.badRequest(error.message);
        }
    },

    // Custom register endpoint
    async register(ctx) {
        try {
            const { email, matKhau, ho, ten, soDienThoai } = ctx.request.body;

            if (!email || !matKhau || !ho || !ten) {
                return ctx.badRequest('Email, mật khẩu, họ và tên là bắt buộc');
            }

            const result = await strapi.service('api::khach-hang.khach-hang').register({
                email,
                matKhau,
                ho,
                ten,
                soDienThoai,
            });

            ctx.send({
                message: 'Đăng ký thành công',
                data: result,
            });
        } catch (error) {
            ctx.badRequest(error.message);
        }
    },

    // Get profile endpoint (with authentication)
    async me(ctx) {
        try {
            const token = ctx.request.header.authorization?.replace('Bearer ', '');

            if (!token) {
                return ctx.unauthorized('Token không được cung cấp');
            }

            const profile = await strapi.service('api::khach-hang.khach-hang').getProfile(token);

            ctx.send({
                message: 'Lấy thông tin thành công',
                data: profile,
            });
        } catch (error) {
            ctx.unauthorized(error.message);
        }
    },

    // Custom middleware để verify token cho protected routes
    async verifyAuth(ctx, next) {
        try {
            const token = ctx.request.header.authorization?.replace('Bearer ', '');

            if (!token) {
                return ctx.unauthorized('Token không được cung cấp');
            }

            const decoded = await strapi.service('api::khach-hang.khach-hang').verifyToken(token);
            ctx.state.user = decoded;

            await next();
        } catch (error) {
            return ctx.unauthorized('Token không hợp lệ');
        }
    },

    // Override default find method với authentication
    async find(ctx) {
        // Verify authentication first
        await this.verifyAuth(ctx, async () => {
            // Call original find method
            return super.find(ctx);
        });
    },

    // Override default findOne method với authentication  
    async findOne(ctx) {
        await this.verifyAuth(ctx, async () => {
            return super.findOne(ctx);
        });
    },

    // Override default create method với authentication
    async create(ctx) {
        await this.verifyAuth(ctx, async () => {
            return super.create(ctx);
        });
    },

    // Override default update method với authentication
    async update(ctx) {
        await this.verifyAuth(ctx, async () => {
            return super.update(ctx);
        });
    },

    // Override default delete method với authentication
    async delete(ctx) {
        await this.verifyAuth(ctx, async () => {
            return super.delete(ctx);
        });
    },
}));
