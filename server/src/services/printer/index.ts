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
          .indent(10)
          .horizontalLine(16)
          .printLine('THERMALGRAM')
          .printImage(filePath)
          .print(() => {
            console.log('SERVICE/PRINTER printing is done');
            done();
          });
      });
    });
  });
};
