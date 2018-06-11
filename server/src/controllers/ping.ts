import { Context } from 'koa';

export default (ctx: Context) => {
  ctx.body = 'pong';
  ctx.status = 200;
};
