import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import { home, ping, upload } from './controllers';

const app = new Koa();
const router = new Router({ prefix: '/api/v1' });

router
  .get('/', home)
  .get('/ping', ping)
  .post('/upload', upload);

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(4321);
