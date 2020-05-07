import jsonwebtoken from 'jsonwebtoken';

const {
  JWT_SECRET_WORD = 'supersecretword',
  JWT_DEFAULT_TTL = '1d',
} = process.env;

const jwt = {
  sign(data: object | string, secret = JWT_SECRET_WORD, limit = JWT_DEFAULT_TTL): Promise<string> {
    return new Promise((resolve, reject) => {
      jsonwebtoken.sign(data, secret, { expiresIn: limit }, (error, token) => {
        if (error) reject(error);
        else resolve(token);
      });
    });
  },

  verify(token, secret = JWT_SECRET_WORD): Promise<object> {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, secret, (error: Error, decoded: object) => {
        if (error) reject(error);
        else resolve(decoded);
      });
    });
  },
};

export default jwt;
