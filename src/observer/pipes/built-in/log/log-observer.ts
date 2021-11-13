import { IObserver } from '../../../type/observer.type';
import { tapObserver } from '../tap/tap-observer';
import { createLogFunctionFromName } from './create-log-function-from-name';

export function logObserver<GValue>(
  emit: IObserver<GValue>,
  name?: string,
): IObserver<GValue> {
  return tapObserver<GValue>(emit, createLogFunctionFromName<GValue>(name));
}
