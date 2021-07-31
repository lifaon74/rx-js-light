import { clearImmediate, setImmediate } from '../helpers';
import { IAbortTimer } from './abort-timer.type';

export function createImmediate(
  callback: () => void,
): IAbortTimer {
  const timer = setImmediate(callback);
  return () => {
    clearImmediate(timer);
  };
}
