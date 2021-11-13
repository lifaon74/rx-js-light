import { IAbortTimer } from './abort-timer.type';


/** TYPES **/

export interface IdleDeadline {
  timeRemaining(): DOMHighResTimeStamp;
  readonly didTimeout: boolean;
}

export interface IdleRequestOptions {
  timeout?: number | undefined;
}

export type IdleCallbackHandle = number;

export interface IdleRequestCallback {
  (deadline: IdleDeadline): void
}

declare function requestIdleCallback(callback: IdleRequestCallback, options?: IdleRequestOptions): number;
declare function cancelIdleCallback(handle: number): void;

/** FUNCTION **/

export function createIdle(
  callback: IdleRequestCallback,
  options?: IdleRequestOptions,
): IAbortTimer {
  const timer = requestIdleCallback(callback, options);
  return () => {
    cancelIdleCallback(timer);
  };
}
