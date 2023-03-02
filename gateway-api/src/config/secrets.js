const { env } = process;

export const GATEWAY_PORT = env.GATEWAY_PORT || 10000;
export const AUTH_API_URL = env.AUTH_API_URL || 'http://localhost:8080/'
export const PRODUCT_API_URL = env.PRODUCT_API_URL || 'http://localhost:8081/'
export const SALES_API_URL = env.SALES_API_URL || 'http://localhost:8082/'
