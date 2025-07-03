import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: any }) {
    // Extend GraphQL schema với custom resolvers cho khachHang
    const extensionService = strapi.plugin('graphql').service('extension');

    // Register custom types và resolvers - Approach 2: Disable shadow CRUD
    extensionService.shadowCRUD('api::khach-hang.khach-hang').disabled = true;

    // Register custom types và resolvers
    extensionService.use(({ nexus, strapi }) => ({
      types: [
        // Input types
        nexus.inputObjectType({
          name: 'RegisterKhachHangInput',
          definition(t) {
            t.nonNull.string('email');
            t.nonNull.string('matKhau');
            t.nonNull.string('ho');
            t.nonNull.string('ten');
            t.string('soDienThoai');
          },
        }),

        nexus.inputObjectType({
          name: 'LoginKhachHangInput',
          definition(t) {
            t.nonNull.string('email');
            t.nonNull.string('matKhau');
          },
        }),

        // Custom response types
        nexus.objectType({
          name: 'KhachHangAuthPayload',
          definition(t) {
            t.string('jwt');
            t.field('user', {
              type: nexus.objectType({
                name: 'AuthKhachHang',
                definition(t) {
                  t.id('id');
                  t.string('email');
                  t.string('ho');
                  t.string('ten');
                  t.string('soDienThoai');
                  t.boolean('laXacThuc');
                  t.boolean('laCam');
                },
              }),
            });
          },
        }),

        // Create new Mutation root
        nexus.extendType({
          type: 'Mutation',
          definition(t) {
            t.field('registerKhachHang', {
              type: 'KhachHangAuthPayload',
              args: {
                input: nexus.nonNull('RegisterKhachHangInput'),
              },
              // Completely custom resolver without any Strapi wrapper
              resolve: async (parent, args, context, info) => {
                console.log('🚀 Raw registerKhachHang resolver called');

                try {
                  const { email, matKhau, ho, ten, soDienThoai } = args.input;

                  // Validate required fields
                  if (!email || !matKhau || !ho || !ten) {
                    throw new Error('Email, mật khẩu, họ và tên là bắt buộc');
                  }

                  // Call service register method directly, bypassing all GraphQL auth
                  const serviceResult = await strapi.service('api::khach-hang.khach-hang').register({
                    email,
                    matKhau,
                    ho,
                    ten,
                    soDienThoai
                  });

                  console.log('✅ Registration successful for:', email);

                  // Return with custom structure
                  return {
                    jwt: serviceResult.token,
                    user: {
                      id: serviceResult.khachHang.id,
                      email: serviceResult.khachHang.email,
                      ho: serviceResult.khachHang.ho,
                      ten: serviceResult.khachHang.ten,
                      soDienThoai: serviceResult.khachHang.soDienThoai,
                      laXacThuc: serviceResult.khachHang.laXacThuc,
                      laCam: serviceResult.khachHang.laCam,
                    }
                  };

                } catch (error) {
                  console.error('❌ Registration error:', error.message);
                  throw new Error(error.message);
                }
              },
            });

            t.field('loginKhachHang', {
              type: 'KhachHangAuthPayload',
              args: {
                input: nexus.nonNull('LoginKhachHangInput'),
              },
              resolve: async (parent, args, context, info) => {
                console.log('🚀 Raw loginKhachHang resolver called');

                try {
                  const { email, matKhau } = args.input;

                  if (!email || !matKhau) {
                    throw new Error('Email và mật khẩu là bắt buộc');
                  }

                  const serviceResult = await strapi.service('api::khach-hang.khach-hang').login(email, matKhau);

                  console.log('✅ Login successful for:', email);

                  return {
                    jwt: serviceResult.token,
                    user: {
                      id: serviceResult.khachHang.id,
                      email: serviceResult.khachHang.email,
                      ho: serviceResult.khachHang.ho,
                      ten: serviceResult.khachHang.ten,
                      soDienThoai: serviceResult.khachHang.soDienThoai,
                      laXacThuc: serviceResult.khachHang.laXacThuc,
                      laCam: serviceResult.khachHang.laCam,
                    }
                  };

                } catch (error) {
                  console.error('❌ Login error:', error.message);
                  throw new Error(error.message);
                }
              },
            });
          },
        }),

        // Custom Query
        nexus.extendType({
          type: 'Query',
          definition(t) {
            t.field('meKhachHang', {
              type: 'AuthKhachHang',
              resolve: async (parent, args, context, info) => {
                console.log('🚀 Raw meKhachHang resolver called');

                try {
                  // Get token from context
                  const token = context.koaContext.request.header.authorization?.replace('Bearer ', '');

                  if (!token) {
                    throw new Error('Token không được cung cấp');
                  }

                  const profile = await strapi.service('api::khach-hang.khach-hang').getProfile(token);

                  console.log('✅ Profile retrieved for user ID:', profile.id);

                  return {
                    id: profile.id,
                    email: profile.email,
                    ho: profile.ho,
                    ten: profile.ten,
                    soDienThoai: profile.soDienThoai,
                    laXacThuc: profile.laXacThuc,
                    laCam: profile.laCam,
                  };

                } catch (error) {
                  console.error('❌ Profile error:', error.message);
                  throw new Error(error.message);
                }
              },
            });
          },
        }),
      ],
      // Disable resolver wrapping completely
      resolversConfig: {
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
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) { },
};
