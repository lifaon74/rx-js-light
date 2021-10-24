import { INotification } from './notification.type';
import { freeze } from '../helpers/freeze';

export function createNotification<GName extends string, GValue>(
  name: GName,
  value: GValue,
): INotification<GName, GValue> {
  return freeze({
    name,
    value,
  });
}



