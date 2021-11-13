import { IObservable } from '../../../../../type/observable.type';
import { IShareObservablePipeGetMultiCastSource } from './share-observable-pipe-get-multi-cast-source.type';
import { shareObservablePipe } from './share-observable-pipe';

export function shareObservable<GValue>(
  subscribe: IObservable<GValue>,
  getMulticastSource?: IShareObservablePipeGetMultiCastSource<GValue>,
): IObservable<GValue> {
  return shareObservablePipe<GValue>(getMulticastSource)(subscribe);
}

