import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import { home, ping, upload } from './controllers';

const PORT = process.env.PORT || 4321;

const app = new Koa();
const router = new Router({ prefix: '/api/v1' });

router
  .get('/', home)
  .get('/ping', ping)
  .post('/upload', upload);

const server = app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT);

server.on('listening', () => {
  console.log(`Server is listening on :${PORT}`);
});
