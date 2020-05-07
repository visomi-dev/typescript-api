import set from 'lodash/set';

import bcrypt from '../bcrypt';
import randomChars from '../randomChars';

import { SignUpUser } from '../../entities/requests';

const {
  REFER_CODE_LENGTH = '5',
  PASSWORD_RANDOM_CHARS = '5',
} = process.env;

const referCodeLength = parseInt(REFER_CODE_LENGTH, 10);
const passwordRandomChars = parseInt(PASSWORD_RANDOM_CHARS, 10);

async function prepareUser(user: SignUpUser, companyId: number): Promise<SignUpUser> {
  set(user, 'email', user.email.toLowerCase());
  set(user, 'referCode', randomChars(referCodeLength));
  set(user, 'defaultCompanyId', companyId);

  if (!user.password) set(user, 'password', randomChars(passwordRandomChars));

  const hash = await bcrypt.hash(user.password);

  set(user, 'password', hash);

  return user;
}

export default prepareUser;
