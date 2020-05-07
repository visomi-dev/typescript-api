import jwt from '../../lib/jwt';

import { SessionResponse, ErrorResponse, SessionToken } from '../../entities/responses';
import models from '../../db/models';

async function validateSession(ctx): Promise<SessionResponse | SessionToken> {
  const { authorization }: { authorization: string } = ctx.request.headers;

  if (!authorization) {
    const error = new ErrorResponse('authorization header is required');

    error.status = 412;
    error.body = { data: { noAuthHeader: true } };

    throw error;
  }

  const info = ctx.query.userInfo ? JSON.parse(ctx.query.userInfo) : true;

  const verifiedToken: SessionToken | undefined = await jwt.verify(authorization);

  if (!verifiedToken) {
    const error = new ErrorResponse('Invalid token');

    error.status = 401;
    error.body = { data: { invalid: true } };

    throw error;
  }

  const jwtPayload = { user: verifiedToken.user, company: verifiedToken.company };

  if (!info) return jwtPayload;

  const [token, user, company] = await Promise.all([
    jwt.sign(jwtPayload),
    models.User.findByPk(jwtPayload.user, { include: [models.Company] }),
    models.Company.findByPk(jwtPayload.company),
  ]);

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

  return {
    token,
    user,
    company,
  };
}

export default validateSession;
