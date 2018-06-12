import SerialPort from 'serialport';
import Printer from 'thermalprinter';

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
  const serialport = new SerialPort(process.env.SERIAL_PORT || '/dev/serial0', {
    baudRate:
      (process.env.BAUD_RATE && parseInt(process.env.BAUD_RATE, 10)) || 19200,
  });

  return new Promise((done, error) => {
    serialport.on('open', () => {
      const printer = new Printer(serialport);
      printer.on('ready', () => {
        printer
          .indent(10)
          .horizontalLine(16)
          .printLine('THERMALGRAM')
          .printImage(filePath)
          .print(() => {
            console.log('THERMALGRAM done');
            done();
          });
      });
    });
  });
};
