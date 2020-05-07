import bcrypt from 'bcrypt';

const { SALT_ROUNDS = '2' } = process.env;

const rounds = parseInt(SALT_ROUNDS, 10);

const hash = (plainText): Promise<string> => bcrypt.hash(plainText, rounds);

export default {
  ...bcrypt,
  hash,
};
