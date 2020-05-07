const bcrypt = require('bcrypt');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || 2, 10);

const hash = plainText => bcrypt.hash(plainText, SALT_ROUNDS);

module.exports = {
  ...bcrypt,
  hash,
};
