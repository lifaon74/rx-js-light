import { IAbortTimer } from './abort-timer.type';

export function createTimeout(
  callback: () => void,
  timeout: number,
): IAbortTimer {
  const timer = setTimeout(callback, timeout);
  return () => {
    clearTimeout(timer);
  };
}
