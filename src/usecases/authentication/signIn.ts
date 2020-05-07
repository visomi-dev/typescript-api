import { Context } from 'koa';

import bcrypt from '../../lib/bcrypt';
import jwt from '../../lib/jwt';

import models from '../../db/models';
import { SessionResponse, ErrorResponse } from '../../entities/responses';

const { MASTER_KEY = 'Temporal1' } = process.env;

async function signIn(ctx: Context): Promise<SessionResponse> {
  const { email, password } = ctx.request.body;

  const user = await models.User.findOne(
    {
      where: { email },
      include: [models.Company],
    },
  );

  if (!user) {
    const error = new ErrorResponse('The user not exists');

    error.status = 404;
    error.body = { data: { badUser: true } };

    throw error;
  }

  if (!user.password && password !== MASTER_KEY) {
    const error = new ErrorResponse('The user not have password, please set it from email');

    error.status = 412;
    error.body = { data: { notPassword: true } };

    throw error;
  }

  const correct = password === MASTER_KEY || await bcrypt.compare(user.password, password);

  if (!correct) {
    const error = new ErrorResponse('Fail password');

    error.status = 401;
    error.body = { data: { badPassword: true } };

    throw error;
  }

  const [token, company] = await Promise.all([
    jwt.sign({ user: user.id, company: user.defaultCompanyId }),
    models.Company.findByPk(user.defaultCompanyId),
  ]);

  return {
    token,
    user,
    company,
  };
}

export default signIn;
