import { createMulticastReplayLastSource } from '../../../../../../../observer-observable-pair/build-in/source/built-in/replay-last-source/derived/create-multicast-replay-last-source';
import { pipeObservable } from '../../../../../../helpers/piping/pipe-observable/pipe-observable';
import { IObservable } from '../../../../../../type/observable.type';
import { IObservablePipe } from '../../../../../type/observable-pipe.type';
import { shareObservablePipe } from '../share-observable-pipe';

export function shareR$$$<GValue>(): IObservablePipe<GValue, GValue> {
  return shareObservablePipe<GValue>(createMulticastReplayLastSource);
}

export function shareR$$<GValue>(
  subscribe: IObservable<GValue>,
): IObservable<GValue> {
  return pipeObservable(subscribe, [
    shareObservablePipe<GValue>(createMulticastReplayLastSource),
  ]);
}
