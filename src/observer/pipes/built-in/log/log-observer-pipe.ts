import { IObserverPipe } from '../../type/observer-pipe.type';
import { tapObserverPipe } from '../tap/tap-observer-pipe';
import { createLogFunctionFromName } from './create-log-function-from-name';

export function logObserverPipe<GValue>(
  name?: string,
): IObserverPipe<GValue, GValue> {
  return tapObserverPipe<GValue>(createLogFunctionFromName<GValue>(name));
}




