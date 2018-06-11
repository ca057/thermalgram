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

const getStorageFilePath = (fileName: string) =>
  path.join(process.cwd(), '__storage', fileName);

export default (ctx: Context) => {
  const { payload, meta } = ctx.request.body as UploadBody;

  if (!payload) return;

  const imageInfo = payload.substring(5, payload.indexOf(';'));
  const encoding = payload.substring(
    payload.indexOf(';') + 1,
    payload.indexOf(',')
  );
  const imageData = payload.substring(payload.indexOf(','));

  const imageBuffer = Buffer.from(imageData, encoding);
  const writeStream = fs.createWriteStream(
    getStorageFilePath(
      Date.now()
        .toString()
        .concat('.png')
    )
  );

  writeStream.write(imageBuffer);
  writeStream.end();

  ctx.body = 'UPLOAD';
};
