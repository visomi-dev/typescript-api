import crypto from 'crypto';

function genRandomChars(length = 0, chars = 'ABCDEFGHIJKLMNOPQRSTUWXYZ0123456789'): string {
  const random = crypto.randomBytes(length);

  const chain = new Array(length).fill(null);

  const len = 256 / Math.min(256, chars.length);

  const result = chain.map((_, index) => chars[Math.floor(random[index] / len)]);

  return result.join('');
}

export default genRandomChars;
