import { createLogFunctionFromName } from '../../pipes/built-in/log/create-log-function-from-name';
import { IObserver } from '../../type/observer.type';

export function createLogObserver<GValue>(
  name?: string,
): IObserver<GValue> {
  return createLogFunctionFromName<GValue>(name);
}
