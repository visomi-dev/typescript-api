import models from '../../db/models';

import { ErrorResponse } from '../../entities/responses';
import { SignUpBody } from '../../entities/requests';

async function signUpExistsCheckList(body: SignUpBody): Promise<void> {
  const preError = {
    errors: [],
    data: {
      userExists: false,
      companyExist: false,
      badReferencedCode: false,
    },
  };

  const promises = [
    models.User.findOne({ where: { email: body.user.email } }),
    models.Company.findOne({ where: { rfc: body.company.rfc } }),
  ];

  if (body.user.referencedCode) {
    promises.push(models.User.findOne({ where: { referCode: body.user.referencedCode } }));
  }

  const [
    userExists,
    companyExists,
    referencedCodeExists,
  ] = await Promise.all(promises);

  if (userExists) {
    preError.errors.push('User already exists');
    preError.data.userExists = true;
  }

  if (companyExists) {
    preError.errors.push('Company already exists');
    preError.data.companyExist = true;
  }

  if (body.user.referencedCode && !referencedCodeExists) {
    preError.errors.push('Invalid referenced code');
    preError.data.badReferencedCode = true;
  }

  if (preError.errors.length > 0) {
    const error = new ErrorResponse(preError.errors.join(', '));

    error.status = 409;
    error.body = { data: preError.data };

    throw error;
  }
}

export default signUpExistsCheckList;
