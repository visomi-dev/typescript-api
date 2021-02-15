import { Context } from 'koa';

import jwt from '../../lib/jwt';
import lib from '../../lib/authentication';

import sequelize from '../../db/sequelize';
import models from '../../db/models';

import { SignUpBody } from '../../entities/requests';
import { SessionResponse } from '../../entities/responses';

async function signUp(ctx: Context): Promise<SessionResponse> {
  const { sendEmail: $sendEmail = 'true' } = ctx.request.query;
  const { body: $body } = ctx.request;

  const sendEmail = JSON.parse($sendEmail.toString());
  const body: SignUpBody = $body;

  const hasPassword = !!body.user.password;

  await lib.signUpExistsCheckList(body);

  const transaction = await sequelize.transaction();
  const company = await models.Company.create(body.company, { transaction });
  const completedUser = await lib.prepareUser(body.user, company.id);
  const user = models.User.build(completedUser);

  try {
    await user.save({ transaction });
    await user.addCompany(company, { transaction });
  } catch (error) {
    await transaction.rollback();

    throw error;
  }

  await transaction.commit();

  const token = await jwt.sign({
    user: user.id,
    company: company.id,
  });

  if (sendEmail) {
    await lib.sendSignUpEmail({
      hasPassword,
      user,
    });
  }

  return {
    token,
    user,
    company,
  };
}

export default signUp;
