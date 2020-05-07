import jwt from '../../lib/jwt';

import { tokens } from '../../constants/tokenTypes';
import env from '../../constants/env';

import { BaseResponse, ErrorResponse } from '../../entities/responses';
import models from '../../db/models';

const {
  FRONT_END_URL = 'http://localhost:8040',
  FRONT_END_VALIDATE_TOKEN_PATH = '/auth/password-reset',
} = env;

async function resetPasswordRequest(ctx): Promise<BaseResponse> {
  const { email } = ctx.request.body;

  const user = await models.User.findOne({ where: { email }, include: [models.Company] });

  if (!user) {
    const error = new ErrorResponse('The user not exists');

    error.status = 404;
    error.body = { data: { badUser: true } };

    throw error;
  }

  const resetPasswordToken = await jwt.sign({ user: user.id }, tokens.resetPassword);

  const emailData = {
    email: user.email,
    name: user.name,
    from: 'support@typescript-api.com',
    product: 'Suppliers',
    brand: 'typescript-api',
    url: `${FRONT_END_URL}/${FRONT_END_VALIDATE_TOKEN_PATH}?resetPasswordToken=${resetPasswordToken}`,
  };

  try {
    // await apiClient.emailer.resetPassword(emailData);
    // eslint-disable-next-line no-console
    console.log(emailData);
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

export default resetPasswordRequest;
