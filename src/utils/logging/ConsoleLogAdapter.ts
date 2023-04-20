import Logger from "./Logger";
import type { LogEvent } from "./types";

class ConsoleLogAdapter extends Logger {
  constructor() {
    super();
  }

  log(event: LogEvent) {
    console.log(event);
  }
}

export default ConsoleLogAdapter;
