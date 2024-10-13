import { pino } from "pino";

const env = process.env.NODE_ENV || "development";

export const createLogger = (props?: { name?: string }) => {
  if (env === "production") {
    return pino({ name: props?.name });
  }

  // const pretty = require("pino-pretty");
  // const stream = pretty({
  //   colorize: true,
  // });
  return pino({ name: props?.name });
};

export const logger = createLogger();
