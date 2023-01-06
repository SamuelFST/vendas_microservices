const { env } = process;

const secrets = {
  SECRET_KEY: env.SECRET_KEY ? env.SECRET_KEY : 'YXV0aC1hcGktc2VjcmV0LWtleS0xMjM0NTY3ODkxMA==',
  EXPIRES_IN: env.EXPIRES_IN ? env.EXPIRES_IN : '1d',
};

export default secrets;
