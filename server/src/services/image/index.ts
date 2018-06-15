import * as path from 'path';
import * as sharp from 'sharp';

const getStorageFilePath = (fileName: string) =>
  path.join(process.cwd(), '__storage', fileName);

type ProcessingOptions = {
  width?: number;
  height?: number;
  fileName?: string;
};

export const processImage = (
  imageBuffer: Buffer,
  processingOptions?: ProcessingOptions
) => {
  console.log('SERVICE/IMAGE image for processing received');
  const options = {
    width: 384,
    height: null,
    fileName: Date.now().toString(),
    ...processingOptions,
  };
  const filePath = getStorageFilePath(options.fileName);
  console.log('SERVICE/IMAGE file path for image will be', filePath);

  return sharp(imageBuffer)
    .resize(options.width)
    .gamma()
    .grayscale()
    .toFile(filePath)
    .then(() => {
      console.log('SERVICE/IMAGE image processing finished');
      return filePath;
    });
};
