import { sourceToReadonlySource } from '../../../../readonly-source/source-to-readonly-source';
import { createMulticastReplayLastSource } from '../../create-multicast-replay-last-source';
import { IReadonlyMulticastReplayLastSource } from './readonly-multicast-replay-last-source.type';


export function createReadonlyMulticastReplayLastSource<GValue>(
  initialValue: GValue,
): IReadonlyMulticastReplayLastSource<GValue> {
  return sourceToReadonlySource(createMulticastReplayLastSource<GValue>({ initialValue }));
}
