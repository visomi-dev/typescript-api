const tokenTypes = [
  'verify-email',
  'reset-password',
  'set-password',
];

// random chars for sign jwt created with the own lib "randomChars" and the key string of the token
export const tokens = {
  verifyEmail: process.env.JWT_VERIFY_EMAIL_SECRET_WORD || 'mvrem',
  resetPassword: process.env.JWT_RESET_PASSWORD_SECRET_WORD || 'eepvr',
  setPassword: process.env.JWT_RESET_PASSWORD_SECRET_WORD || 'xejuo',
};

export default tokenTypes;
