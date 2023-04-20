export type LogEvent = string | { message: string } & Record<string, unknown>;
export type LogTransformer = (arg0: LogEvent) => LogEvent;
