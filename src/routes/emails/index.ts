import Router from 'koa-router';

import authenticationRoutes from './authentication';

const router = new Router({ prefix: '/emails' });

router.use(authenticationRoutes.routes()).use(authenticationRoutes.allowedMethods());

export default router;
