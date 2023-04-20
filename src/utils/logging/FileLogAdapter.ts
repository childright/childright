import pino from "pino";
import type { LogEvent } from "./types";
import Logger from "./Logger";

class FileLogAdapter extends Logger {
  private loggerInstance: pino.Logger;

  constructor(filePath: string) {
    super();

    const stream = pino.destination(filePath);
    this.loggerInstance = pino({}, stream);
  }

  log(event: LogEvent) {
    this.loggerInstance.info(event);
  }
}

export default FileLogAdapter;
