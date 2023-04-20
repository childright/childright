import type { LogEvent } from "./types";

abstract class Logger {
  abstract log(event: LogEvent): void;
}
export default Logger;
