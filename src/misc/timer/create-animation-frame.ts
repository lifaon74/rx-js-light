import { IAbortTimer } from './abort-timer.type';

export function createAnimationFrame(
  callback: () => void,
): IAbortTimer {
  const timer = requestAnimationFrame(callback);
  return () => {
    cancelAnimationFrame(timer);
  };
}
