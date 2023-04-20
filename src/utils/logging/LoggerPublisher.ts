import type Logger from "./Logger";
import type { LogEvent, LogTransformer } from "./types";

class LoggerPublisher {
  listeners: Logger[];
  transformers: LogTransformer[];

  constructor(listeners: Logger[] = [], transformers: LogTransformer[] = []) {
    this.listeners = listeners;
    this.transformers = transformers;
  }

  log(event: LogEvent) {
    for (const transformer of this.transformers) {
      event = transformer(event);
    }

    for (const listener of this.listeners) {
      listener.log(event);
    }
  }

  addListener(listener: Logger) {
    this.listeners.push(listener);
  }

  removeListener(listener: Logger) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  addTransformer(transformer: LogTransformer) {
    this.transformers.push(transformer);
  }

  removeTransformer(transformer: LogTransformer) {
    this.transformers = this.transformers.filter((t) => t !== transformer);
  }
}
export default LoggerPublisher;
