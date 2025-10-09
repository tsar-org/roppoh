import type { Logger } from "pino";
import pino from "pino";

const logger = pino({
  level: "info",
});

export const createLogger = (): Logger => {
  return logger;
};
