const SerialPort = require('serialport');
const Printer = require('thermalprinter');

import config from './../../config';

type ImageMeta =
  | {
      timestamp?: Number;
      name?: String;
      location?: {
        lat: Number;
        long: Number;
      };
    }
  | undefined;

export const printImage = (filePath: string, meta: ImageMeta) => {
  console.log('SERVICE/PRINTER received image at', filePath);
  const serialport = new SerialPort(config.SERIAL_PORT, {
    baudRate: config.BAUD_RATE,
  });

  return new Promise((done, error) => {
    serialport.on('open', () => {
      console.log('SERVICE/PRINTER serialport is open');
      const printer = new Printer(serialport);
      printer.on('ready', () => {
        console.log('SERVICE/PRINTER printer is ready, printing starts');
        printer
          .horizontalLine(32)
          .indent(10)
          .printLine('THERMALGRAM')
          .indent(0)
          .lineFeed(1)
          .printImage(filePath)
          .lineFeed(1)
          .printLine(`by ${(meta && meta.name) || '?'} with <3`)
          .lineFeed(3)
          .print(() => {
            serialport.close();
            console.log('SERVICE/PRINTER printing is done');
            done();
          });
      });
    });
  });
};
