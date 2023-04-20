import pino from "pino";
import { createWriteStream } from "pino-logflare";
import type { LogEvent } from "./types";
import Logger from "./Logger";
import { env } from "../../env/server.mjs";

class LogflareLoggerAdapter extends Logger {
  private loggerInstance: pino.Logger;

  log(event: LogEvent) {
    this.loggerInstance.info(event);
  }

  constructor() {
    super();
    const writeStream = createWriteStream({
      apiKey: env.LOGFLARE_API_KEY,
      sourceToken: env.LOGFLARE_SOURCE_TOKEN,
    });

    this.loggerInstance = pino(
      {
        base: {
          env: process.env.VERCEL_ENV,
          revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
        },
      },
      writeStream
    );
  }
}

export default LogflareLoggerAdapter;
