import { INotification } from './notification.type';
import { isObject } from '../helpers/is-type/is-object';

export function isNotification<GName extends string, GValue>(
  value: any,
  name?: GName,
): value is INotification<GName, GValue> {
  return isObject(value)
    && ('name' in value)
    && ('value' in value)
    && (
      (name === void 0)
      || ((value as any).name === name)
    );
}
