import { IKeyValueIterable, IKeyValueIterableLike } from './key-value-iterable';


export function keyValueIterableLikeToKeyValueIterable<GKey, GValue>(
  keyValueIterableLike:  IKeyValueIterableLike<GKey, GValue>,
): IKeyValueIterable<GKey, GValue> {
  if (Symbol.iterator in keyValueIterableLike) {
    return keyValueIterableLike as IKeyValueIterable<GKey, GValue>;
  } else {
    return Object.entries(keyValueIterableLike) as IKeyValueIterable<GKey, GValue>;
  }
}
