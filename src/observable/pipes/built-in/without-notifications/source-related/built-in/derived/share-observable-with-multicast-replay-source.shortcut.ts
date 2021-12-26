import {
  createMulticastReplaySource
} from '../../../../../../../observer-observable-pair/build-in/source/built-in/replay-source/derived/create-multicast-replay-source';
import { IObservable } from '../../../../../../type/observable.type';
import { IObservablePipe } from '../../../../../type/observable-pipe.type';
import { shareObservable } from '../share-observable';
import { shareObservablePipe } from '../share-observable-pipe';

export function shareR$$$<GValue>(
  maxNumberOfValues?: number,
): IObservablePipe<GValue, GValue> {
  return shareObservablePipe<GValue>(() => createMulticastReplaySource(maxNumberOfValues));
}

export function shareR$$<GValue>(
  subscribe: IObservable<GValue>,
  maxNumberOfValues?: number,
): IObservable<GValue> {
  return shareObservable<GValue>(subscribe, () => createMulticastReplaySource(maxNumberOfValues));
}
