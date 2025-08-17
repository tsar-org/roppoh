import pino from "pino";
import type { Logger } from "pino";

const logger = pino({
  level: "info",
});

export const createLogger = ({
  moduleName,
}: { moduleName: string }): Logger => {
  return logger.child({ module: moduleName });
};
