/**
 * Custom middleware để bypass authentication cho GraphQL requests
 */

export default (config, { strapi }) => {
    return async (ctx, next) => {
        // Kiểm tra nếu là GraphQL request
        if (ctx.request.url === '/graphql' && ctx.request.method === 'POST') {
            const query = ctx.request.body?.query;

            // Nếu là custom resolvers của chúng ta, bypass auth
            if (query && (
                query.includes('registerKhachHang') ||
                query.includes('loginKhachHang') ||
                query.includes('meKhachHang')
            )) {
                console.log('🔓 GraphQL Auth Bypass Middleware: Bypassing auth for custom resolver');

                // Bypass authentication bằng cách set user context
                ctx.state.user = null;
                ctx.state.isAuthenticated = false;

                // Set header để báo hiệu đây là request được bypass
                ctx.set('X-Auth-Bypass', 'true');
            }
        }

        await next();
    };
}; 