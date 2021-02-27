import { fromArray } from '../../iterable/sync/from-array/from-array';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';


export function of<GValue>(
  ...values: GValue[]
): ISubscribeFunction<GValue> {
  return fromArray<GValue>(values);
}


