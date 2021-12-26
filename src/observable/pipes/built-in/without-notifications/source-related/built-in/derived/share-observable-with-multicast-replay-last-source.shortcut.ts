import { createMulticastReplayLastSource } from '../../../../../../../observer-observable-pair/build-in/source/built-in/replay-last-source/derived/create-multicast-replay-last-source';
import { IObservable } from '../../../../../../type/observable.type';
import { IObservablePipe } from '../../../../../type/observable-pipe.type';
import { shareObservable } from '../share-observable';
import { shareObservablePipe } from '../share-observable-pipe';

export function shareRL$$$<GValue>(): IObservablePipe<GValue, GValue> {
  return shareObservablePipe<GValue>(createMulticastReplayLastSource);
}

export function shareRL$$<GValue>(
  subscribe: IObservable<GValue>,
): IObservable<GValue> {
  return shareObservable<GValue>(subscribe, createMulticastReplayLastSource);
}
