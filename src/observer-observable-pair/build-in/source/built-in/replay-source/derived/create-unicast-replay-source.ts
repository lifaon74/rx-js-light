import { createUnicastSource } from '../../unicast-source/create-unicast-source';
import { IUnicastSource } from '../../unicast-source/unicast-source.type';
import { createReplaySource } from '../create-replay-source';
import { IReplaySource } from '../replay-source.type';

export type IUnicastReplaySource<GValue> = IReplaySource<GValue, IUnicastSource<GValue>>;

export function createUnicastReplaySource<GValue>(
  maxNumberOfValues?: number,
): IUnicastReplaySource<GValue> {
  return createReplaySource<GValue, IUnicastSource<GValue>>(
    createUnicastSource<GValue>(),
    maxNumberOfValues,
  );
}
