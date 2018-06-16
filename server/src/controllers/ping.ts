import { Context } from 'koa';

export default (ctx: Context) => {
  ctx.body = { message: 'pong' };
  ctx.status = 200;
};
