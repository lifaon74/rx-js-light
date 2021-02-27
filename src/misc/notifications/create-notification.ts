import { INotification } from './notification.type';


export function createNotification<GName extends string, GValue>(
  name: GName,
  value: GValue,
): INotification<GName, GValue> {
  return Object.freeze({
    name,
    value,
  });
}



