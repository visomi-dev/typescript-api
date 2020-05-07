import signUp from './signUp';
import signIn from './signIn';
import validateSession from './validateSession';
import validateToken from './validateToken';
import resetPassword from './resetPassword';
import resetPasswordRequest from './resetPasswordRequest';
import resendVerifyEmail from './resendVerifyEmail';

const usecases = {
  signUp,
  signIn,
  validateSession,
  validateToken,
  resetPassword,
  resetPasswordRequest,
  resendVerifyEmail,
};

export default usecases;
