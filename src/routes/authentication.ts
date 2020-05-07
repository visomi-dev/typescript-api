import KoaRouter from 'koa-router';

import schemaValidator from '../middlewares/schemaValidator';

import usecases from '../usecases/authentication';

import authSchema from '../constants/json-schemas/authentication.json';
import signUpSchema from '../constants/json-schemas/sign-up.json';
import signInSchema from '../constants/json-schemas/sign-in.json';
import passwordRecoverySchema from '../constants/json-schemas/password-recovery.json';
import passwordResetSchema from '../constants/json-schemas/password-reset.json';

import tokenTypes from '../constants/tokenTypes';

const router = new KoaRouter({ prefix: '/authentication' });

const signUpValidator = schemaValidator(signUpSchema, { defsSchemas: [authSchema] });
const signInValidator = schemaValidator(signInSchema);

const passwordRecoveryValidator = schemaValidator(passwordRecoverySchema);
const passwordResetValidator = schemaValidator(passwordResetSchema);

const tokens = tokenTypes.join('|');

router
  .post('/sign-up', signUpValidator, async (ctx, next) => {
    const data = await usecases.signUp(ctx);

    ctx.status = 201;
    ctx.body = {
      success: true,
      message: 'The user was created successfully',
      data,
    };

    await next();
  })
  .post('/resend-verify-email', async (ctx, next) => {
    await usecases.resendVerifyEmail(ctx);

    ctx.status = 201;
    ctx.body = {
      success: true,
      message: 'The request for send validate email was sended',
    };

    await next();
  })
  .post('/sign-in', signInValidator, async (ctx, next) => {
    const data = await usecases.signIn(ctx);

    ctx.status = 201;
    ctx.body = {
      success: true,
      message: 'Session created, expires in one day',
      data,
    };

    await next();
  })
  .get('/validate/session', async (ctx, next) => {
    const data = await usecases.validateSession(ctx);

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'The session was revalidated',
      data,
    };

    await next();
  })
  .get(`/validate/token/:type(${tokens})`, async (ctx, next) => {
    const data = await usecases.validateToken(ctx);

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'The token is correct',
      data,
    };

    await next();
  })
  .put('/password/recovery', passwordRecoveryValidator, async (ctx, next) => {
    const data = await usecases.resetPasswordRequest(ctx);

    ctx.status = 201;
    ctx.body = {
      success: true,
      message: 'The email with the instructions for recover the password',
      data,
    };

    await next();
  })
  .put('/password/reset', passwordResetValidator, async (ctx, next) => {
    const data = await usecases.resetPassword(ctx);

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'Reset',
      data,
    };

    await next();
  });

export default router;
