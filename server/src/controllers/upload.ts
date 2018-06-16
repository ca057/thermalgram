import { Context } from 'koa';

import config from './../config';
import { processImage } from './../services/image';
import { printImage } from './../services/printer';

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

export default async (ctx: Context) => {
  console.log('CONTROLLER/UPLOAD received request');
  const { payload, meta } = ctx.request.body as UploadBody;

  if (!payload || !config.CAN_PRINT) return;

  const imageInfo = payload.substring(5, payload.indexOf(';'));
  const encoding = payload.substring(
    payload.indexOf(';') + 1,
    payload.indexOf(',')
  );

  const imageData = payload.substring(payload.indexOf(','));
  const imageBuffer = Buffer.from(imageData, encoding);
  const fileName = Date.now()
    .toString()
    .concat(`.${imageInfo.split('/')[1] || 'png'}`);

  const filePath = await processImage(imageBuffer, { fileName });

  console.log('CONTROLLER/UPLOAD image processed, start printing');
  await printImage(filePath, meta);
  console.log('CONTROLLER/UPLOAD image printed, everything is done');

  ctx.body = 'UPLOAD and PRINTING successful, now go on with your lives!';
};
