import pino from "pino";
import pretty from "pino-pretty";

const stream = pretty({
  colorize: true,
});

const Logger = pino(stream);

export default Logger;
