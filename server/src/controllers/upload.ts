import { Context } from 'koa';
import * as path from 'path';
import * as fs from 'fs';
import { Buffer } from 'buffer';

type UploadBody = {
  payload?: String;
  meta?: {
    timestamp?: Number;
    name?: String;
    location?: {
      lat: Number;
      long: Number;
    };
  };
};

export default (ctx: Context) => {
  const { payload, meta } = ctx.request.body as UploadBody;

  if (!payload) return;

  console.log(path.join(process.cwd(), '__storage'));

  const imageInfo = payload.substring(5, payload.indexOf(';'));
  const encoding = payload.substring(
    payload.indexOf(';') + 1,
    payload.indexOf(',')
  );
  const imageData = payload.substring(payload.indexOf(','));

  const imageBuffer = Buffer.from(imageData, encoding);
  const writeStream = fs.createWriteStream(
    path.join(process.cwd(), '__storage', Date.now().toString() + '.png')
  );

  writeStream.write(imageBuffer);
  writeStream.end();

  ctx.body = 'UPLOAD';
};
