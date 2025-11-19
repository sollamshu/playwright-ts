export const standardUser = {
  username: process.env.SAUCE_USER || 'standard_user',
  password: process.env.SAUCE_PASSWORD || 'secret_sauce',
  description: 'Standard User',
};