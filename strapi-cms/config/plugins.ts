export default () => ({
    graphql: {
      enabled: true,
      config: {
        endpoint: '/graphql',
        shadowCRUD: true,
        landingPage: true,
        depthLimit: 7,
        amountLimit: 100,
        apolloServer: {
          tracing: false,
          introspection: true,
          // Không cần playground ở đây nữa vì đã có landingPage
        },
      },
    },
  });
  