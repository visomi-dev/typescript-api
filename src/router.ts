import KoaRouter from 'koa-router';

import authenticationRoutes from './routes/authentication';
import documentationRoutes from './routes/documentation';
import emailsRoutes from './routes/emails';

const router = new KoaRouter();

router.use(documentationRoutes.routes()).use(documentationRoutes.allowedMethods());
router.use(authenticationRoutes.routes()).use(authenticationRoutes.allowedMethods());
router.use(emailsRoutes.routes()).use(emailsRoutes.allowedMethods());

export default router;
