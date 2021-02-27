import { IAbortTimer } from './abort-timer.type';

export function createIdle(
  callback: IdleRequestCallback,
  options?: IdleRequestOptions
): IAbortTimer {
  const timer = requestIdleCallback(callback, options);
  return () => {
    cancelIdleCallback(timer);
  };
}
