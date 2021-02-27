import { IReplayLastSource } from '../replay-last-source.type';
import { IMulticastSource } from '../../multicast-source/multicast-source.type';
import { createMulticastSource } from '../../multicast-source/create-multicast-source';
import { createReplayLastSource, ICreateReplayLastSourceOptions } from '../create-replay-last-source';

export interface ICreateMulticastReplayLastSourceOptions<GValue> extends ICreateReplayLastSourceOptions<GValue> {
  disableDuplicateSubscribeVerification?: boolean,
}

export type IMulticastReplayLastSource<GValue> = IReplayLastSource<GValue, IMulticastSource<GValue>>;

export function createMulticastReplayLastSource<GValue>(
  options?: ICreateMulticastReplayLastSourceOptions<GValue>,
): IMulticastReplayLastSource<GValue> {
  return createReplayLastSource<GValue, IMulticastSource<GValue>>(
    createMulticastSource<GValue>(options?.disableDuplicateSubscribeVerification),
    options,
  );
}
