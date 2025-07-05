/**
 * Middleware to handle BigInt serialization in GraphQL responses
 * Converts BigInt values to regular numbers before JSON serialization
 */

export default (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    // Only process GraphQL responses
    if (ctx.request.url === '/graphql' && ctx.response.body) {
      try {
        // Convert BigInt values to numbers recursively
        const convertBigIntToNumber = (obj: any): any => {
          if (obj === null || obj === undefined) {
            return obj;
          }
          
          if (typeof obj === 'bigint') {
            return Number(obj);
          }
          
          if (Array.isArray(obj)) {
            return obj.map(convertBigIntToNumber);
          }
          
          if (typeof obj === 'object') {
            const converted = {};
            for (const key in obj) {
              if (obj.hasOwnProperty(key)) {
                converted[key] = convertBigIntToNumber(obj[key]);
              }
            }
            return converted;
          }
          
          return obj;
        };

        // Convert the response body
        ctx.response.body = convertBigIntToNumber(ctx.response.body);
      } catch (error) {
        console.error('Error converting BigInt in GraphQL response:', error);
        // Continue with original response if conversion fails
      }
    }
  };
}; 