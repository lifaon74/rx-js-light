import { createMulticastSource } from '../../multicast-source/create-multicast-source';
import { IMulticastSource } from '../../multicast-source/multicast-source.type';
import { createReplaySource } from '../create-replay-source';
import { IReplaySource } from '../replay-source.type';

export type IMulticastReplaySource<GValue> = IReplaySource<GValue, IMulticastSource<GValue>>;

export function createMulticastReplaySource<GValue>(
  maxNumberOfValues?: number,
): IMulticastReplaySource<GValue> {
  return createReplaySource<GValue, IMulticastSource<GValue>>(
    createMulticastSource<GValue>(),
    maxNumberOfValues,
  );
}
