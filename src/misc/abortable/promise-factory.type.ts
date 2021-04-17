export interface IPromiseFactory<GValue> {
  (signal: AbortSignal): Promise<GValue>;
}
