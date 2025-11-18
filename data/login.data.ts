export const standardUser = {
  username: process.env.SAUCE_USER || 'standard_user',
  password: process.env.SAUCE_PASSWORD || 'secret_sauce',
  description: 'Standard User',
};

export const lockedOutUser = {
  username: 'locked_out_user',
  password: process.env.SAUCE_PASSWORD || 'secret_sauce',
  description: 'Locked Out User',
  expectedError: 'Epic sadface: Sorry, this user has been locked out.',
};

export const invalidPasswordUser = {
  username: 'standard_user',
  password: 'wrong_password',
  description: 'Invalid Password User',
  expectedError: 'Epic sadface: Username and password do not match any user in this service',
};