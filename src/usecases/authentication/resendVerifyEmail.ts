import { Context } from 'koa';

import jwt from '../../lib/jwt';
import lib from '../../lib/authentication';

import models from '../../db/models';

import { ErrorResponse, BaseResponse, SessionToken } from '../../entities/responses';

async function resendVerifyEmail(ctx: Context): Promise<BaseResponse> {
  const { authorization }: { authorization?: string } = ctx.request.headers;

  if (!authorization) {
    const error = new ErrorResponse('authorization header is required');

    error.status = 412;
    error.body = { data: { noAuthHeader: true } };

    throw error;
  }

  const verifiedToken: SessionToken | undefined = await jwt.verify(authorization);

  if (!verifiedToken) {
    const error = new ErrorResponse('Invalid token');

    error.status = 401;
    error.body = { data: { invalid: true } };

    throw error;
  }

  const user = await models.User.findByPk(
    verifiedToken.user,
    { include: [models.Company] },
  );

  if (!user) {
    const error = new ErrorResponse('The user not exists');

    error.status = 422;
    error.body = { data: { badUser: true } };

    throw error;
  }

  try {
    await lib.sendVerifyEmail(user);
  } catch ({ message }) {
    const error = new ErrorResponse(`An error ocurred when trying to send email, ${message}`);

    error.status = 500;
    error.body = { data: { emailError: true } };

    throw error;
  }

  return {
    success: true,
    message: 'Email was queued',
  };
}

export default resendVerifyEmail;
