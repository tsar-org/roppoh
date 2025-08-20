import pino from "pino";
import type { Logger } from "pino";

const logger = pino({
  level: "info",
});

export const createLogger = (): Logger => {
  return logger;
};
