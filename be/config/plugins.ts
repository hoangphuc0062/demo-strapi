export default ({ env }) => ({
    graphql: {
        config: {
            endpoint: '/graphql',
            shadowCRUD: true,
            depthLimit: 7,
            amountLimit: 100,
            playground: false,
            introspection: env('NODE_ENV') === 'development',
            defaultResolverAuth: false,
            apolloServer: {
                tracing: false,
            },
            resolversConfig: {
                'Query.*': {
                    auth: false,
                    policies: [],
                    middlewares: [],
                },
                'Mutation.*': {
                    auth: false,
                    policies: [],
                    middlewares: [],
                },
                'Mutation.registerKhachHang': {
                    auth: false,
                    policies: [],
                    middlewares: [],
                },
                'Mutation.loginKhachHang': {
                    auth: false,
                    policies: [],
                    middlewares: [],
                },
                'Query.meKhachHang': {
                    auth: false,
                    policies: [],
                    middlewares: [],
                },
            },
            disable: false,
        },
    },
    'users-permissions': {
        config: {
            register: {
                allowedFields: ['ho', 'ten', 'soDienThoai', 'avatar'],
            },
        },
    },
});
