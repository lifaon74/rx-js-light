import { createMulticastReplayLastSource, IMulticastReplayLastSource } from './create-multicast-replay-last-source';

export function let$$<GValue>(
  initialValue?: GValue,
): IMulticastReplayLastSource<GValue> {
  return createMulticastReplayLastSource<GValue>({ initialValue });
}


export function letU$$<GValue>(): IMulticastReplayLastSource<GValue> {
  return createMulticastReplayLastSource<GValue>();
}

// export function let$$<GValue>(
//   initialValue?: GValue
// ): IMulticastReplayLastSource<GValue> {
//   return createMulticastReplayLastSource<GValue>((arguments.length === 0) ? {} : { initialValue });
// }
