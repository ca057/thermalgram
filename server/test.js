var SerialPort = require('serialport'),
  serialPort = new SerialPort('/dev/serial0', {
    baudRate: 19200,
  }),
  Printer = require('thermalprinter');

var path = __dirname + '/image.jpg';

serialPort.on('open', function() {
  var printer = new Printer(serialPort);
  printer.on('ready', function() {
    printer
      .horizontalLine(32)
      .indent(10)
      .printLine('THERMALGRAM')
      .indent(0)
      .printLine('by Christian with <3')
      .printLine(' ')
      .printImage(path)
      .printLine(' ')
      .printLine(' ')
      .printLine(' ')
      .print(function() {
        console.log('done');
        process.exit();
      });
  });
});
