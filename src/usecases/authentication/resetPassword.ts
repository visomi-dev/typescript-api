import { Context } from 'koa';

import bcrypt from '../../lib/bcrypt';
import jwt from '../../lib/jwt';

import { SessionResponse, ErrorResponse, SessionToken } from '../../entities/responses';
import { tokens } from '../../constants/tokenTypes';

import models from '../../db/models';

async function resetPassword(ctx: Context): Promise<SessionResponse> {
  const { token, password } = ctx.request.body;

  const [verifiedToken, hash]: [SessionToken, string] = await Promise.all([
    jwt.verify(token, tokens.resetPassword),
    bcrypt.hash(password),
  ]);

  if (!verifiedToken) {
    const error = new ErrorResponse('Invalid token');
    error.status = 401;
    throw error;
  }

  const user = await models.User.findByPk(verifiedToken.user);

  if (!user) {
    const error = new ErrorResponse('The user not exists');

    error.status = 422;
    error.body = { data: { badUser: true } };

    throw error;
  }

  user.password = hash;

  const [sessionToken, company] = await Promise.all([
    jwt.sign({ user: user.id, company: user.defaultCompany }),
    models.Company.findByPk(user.defaultCompany),
    user.save(),
  ]);

  if (!company) {
    const error = new ErrorResponse('The company not exists');

    error.status = 404;
    error.body = { data: { badCompany: true } };

    throw error;
  }

  return {
    token: sessionToken,
    user,
    company,
  };
}

export default resetPassword;
