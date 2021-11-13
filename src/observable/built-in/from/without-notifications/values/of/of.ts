import { fromArray } from '../../iterable/from-array/from-array';
import { IObservable } from '../../../../../type/observable.type';

export function of<GValue>(
  ...values: GValue[]
): IObservable<GValue> {
  return fromArray<GValue>(values);
}


