/**
 * khach-hang router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::khach-hang.khach-hang' as any, {
    config: {
        find: {
            auth: false, // Tạm thời tắt auth để test
            policies: [],
            middlewares: [],
        },
        findOne: {
            auth: false,
            policies: [],
            middlewares: [],
        },
        create: {
            auth: false,
            policies: [],
            middlewares: [],
        },
        update: {
            auth: false,
            policies: [],
            middlewares: [],
        },
        delete: {
            auth: false,
            policies: [],
            middlewares: [],
        },
    },
});


