export type LogEvent = string | ({ message: string } & Record<string, unknown>);
export type LogTransformer = () => LogEvent;
