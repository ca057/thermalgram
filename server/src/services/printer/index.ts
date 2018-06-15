const SerialPort = require('serialport');
const Printer = require('thermalprinter');

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
  const serialport = new SerialPort(process.env.SERIAL_PORT || '/dev/serial0', {
    baudRate:
      (process.env.BAUD_RATE && parseInt(process.env.BAUD_RATE, 10)) || 19200,
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
