import KoaRouter from 'koa-router';

import usecases from '../../usecases/emails';
import templates from '../../lib/templates';

import emailValidator from '../../middlewares/emailSchemaValidator';

const router = new KoaRouter({ prefix: '/authentication' });

router
  .post('/sign-up', emailValidator, async (ctx, next) => {
    const data = await usecases.send({
      template: templates.signUp,
      data: ctx.request.body,
      subject: 'Bienvenido a bordo',
    });

    ctx.status = 201;
    ctx.body = {
      success: true,
      message: 'The email was queued',
      data,
    };

    await next();
  })
  .post('/verify-email', emailValidator, async (ctx, next) => {
    const data = await usecases.send({
      template: templates.verifyEmail,
      data: ctx.request.body,
      subject: 'Verificar email',
    });

    ctx.status = 201;
    ctx.body = {
      success: true,
      message: 'The email was queued',
      data,
    };

    await next();
  })
  .post('/set-password', emailValidator, async (ctx, next) => {
    const data = await usecases.send({
      template: templates.setPassword,
      data: ctx.request.body,
      subject: 'Ingresa tu contraseña',
    });

    ctx.status = 201;
    ctx.body = {
      success: true,
      message: 'The email was queued',
      data,
    };

    await next();
  })
  .post('/reset-password', emailValidator, async (ctx, next) => {
    const data = await usecases.send({
      template: templates.resetPassword,
      data: ctx.request.body,
      subject: 'Recupera tu contraseña',
    });

    ctx.status = 201;
    ctx.body = {
      success: true,
      message: 'The email was queued',
      data,
    };

    await next();
  });

export default router;
