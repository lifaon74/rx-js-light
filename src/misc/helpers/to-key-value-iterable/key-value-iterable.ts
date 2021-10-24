import { IKeyValueTuple } from '../../types/key-value.type';

export type IKeyValueIterable<GKey, GValue> = Iterable<IKeyValueTuple<GKey, GValue>>;

export type IKeyValueIterableLike<GKey, GValue> = object | IKeyValueIterable<GKey, GValue>;
