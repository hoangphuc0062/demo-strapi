/**
 * khach-hang auth routes
 */

export default {
    routes: [
        // Login route
        {
            method: 'POST',
            path: '/khach-hang/auth/login',
            handler: 'api::khach-hang.khach-hang.login',
            config: {
                auth: false,
                policies: [],
                middlewares: [],
            },
        },
        // Register route
        {
            method: 'POST',
            path: '/khach-hang/auth/register',
            handler: 'api::khach-hang.khach-hang.register',
            config: {
                auth: false,
                policies: [],
                middlewares: [],
            },
        },
        // Profile route (authenticated)
        {
            method: 'GET',
            path: '/khach-hang/auth/me',
            handler: 'api::khach-hang.khach-hang.me',
            config: {
                auth: false, // We handle auth manually in controller
                policies: [],
                middlewares: [],
            },
        },

        // Compatibility routes với path cũ
        {
            method: 'POST',
            path: '/auth/login',
            handler: 'api::khach-hang.khach-hang.login',
            config: {
                auth: false,
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/auth/register',
            handler: 'api::khach-hang.khach-hang.register',
            config: {
                auth: false,
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'GET',
            path: '/auth/me',
            handler: 'api::khach-hang.khach-hang.me',
            config: {
                auth: false,
                policies: [],
                middlewares: [],
            },
        },
    ],
}; 