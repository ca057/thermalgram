import * as dotenv from 'dotenv';
dotenv.config();

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import config from './config';
import { home, ping, upload } from './controllers';

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
  .listen(config.PORT);

server.on('listening', () => {
  console.log(`Server is listening on :${config.PORT}`);
});
