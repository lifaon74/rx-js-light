import { fromIterator } from '../from-iterator/from-iterator';
import { ISubscribeFunction } from '../../../../../types/subscribe-function/subscribe-function.type';

export function fromIterable<GValue>(
  iterable: Iterable<GValue>,
): ISubscribeFunction<GValue> {
  return fromIterator<GValue>(iterable[Symbol.iterator]());
}
