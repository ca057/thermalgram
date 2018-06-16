type Config = {
  PORT: number;
  BAUD_RATE: number;
  SERIAL_PORT: string;
  CAN_PRINT: boolean;
};

const parseIntOrDefault = (
  value: string | undefined | null,
  defaultValue: number
) => {
  if (value === undefined || value === null) return defaultValue;

  return parseInt(value, 10);
};

const config: Config = {
  PORT: parseIntOrDefault(process.env.PORT, 4321),
  BAUD_RATE: parseIntOrDefault(process.env.BAUD_RATE, 19200),
  SERIAL_PORT: process.env.SERIAL_PORT || '/dev/serial0',

  CAN_PRINT: process.env.PRINTER === 'off' ? false : true,
};

export default config;
