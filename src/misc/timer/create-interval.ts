import { IAbortTimer } from './abort-timer.type';

export function createInterval(
  callback: () => void,
  interval: number,
): IAbortTimer {
  const timer = setInterval(callback, interval);
  return () => {
    clearInterval(timer);
  };
}
