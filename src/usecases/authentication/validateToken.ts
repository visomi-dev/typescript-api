import camelCase from 'lodash/camelCase';

import jwt from '../../lib/jwt';

import { SessionResponse, ErrorResponse, SessionToken } from '../../entities/responses';
import { tokens } from '../../constants/tokenTypes';

import models from '../../db/models';

async function validateToken(ctx): Promise<SessionResponse> {
  const { type } = ctx.params;
  const { jwt: jwtCode } = ctx.query;

  const tokenType = camelCase(type);

  const verifiedToken: SessionToken | undefined = await jwt.verify(jwtCode, tokens[tokenType]);

  if (!verifiedToken) {
    const error = new ErrorResponse('Invalid token');

    error.status = 401;
    error.body = { data: { invalid: true } };

    throw error;
  }

  const user = await models.User.findByPk(verifiedToken.user, { include: [models.Company] });
  const company = await models.Company.findByPk(user.company);

  if (!user) {
    const error = new ErrorResponse('The user not exists');

    error.status = 404;
    error.body = { data: { badUser: true } };

    throw error;
  }

  if (!company) {
    const error = new ErrorResponse('The company not exists');

    error.status = 404;
    error.body = { data: { badCompany: true } };

    throw error;
  }

  user.emailVerified = true;

  await user.save();

  const token = await jwt.sign({ user: user.id, company: company.id });

  return {
    token,
    user,
    company,
  };
}

export default validateToken;
