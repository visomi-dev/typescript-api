import jwt from '../jwt';
import { tokens } from '../../constants/tokenTypes';

import templates from '../templates';
import emails from '../../usecases/emails';

import { ErrorResponse } from '../../entities/responses';
import { UserModel } from '../../entities/models';

const {
  FRONT_END_URL = 'http://localhost:8040',
  FRONT_END_VALIDATE_TOKEN_PATH = '/auth/validate-email',
} = process.env;

async function sendSignUpEmail(user: UserModel): Promise<void> {
  try {
    const verifyEmailToken = await jwt.sign({ user: user.id }, tokens.verifyEmail);

    const emailData = {
      to: user.name ? `${user.name} <${user.email}>` : user.name,
      from: 'support@typescript-api.com',
      product: 'Suppliers',
      brand: 'typescript-api',
      url: `${FRONT_END_URL}/${FRONT_END_VALIDATE_TOKEN_PATH}?verifyEmailToken=${verifyEmailToken}`,
    };

    await emails.send({
      template: templates.signUp,
      data: emailData,
      subject: 'Bienvenido a bordo',
    });
  } catch ({ message }) {
    const error = new ErrorResponse(`An error ocurred when trying to send email, ${message}`);

    error.body = { data: { emailError: true } };
    error.status = 500;

    throw error;
  }
}

export default sendSignUpEmail;
