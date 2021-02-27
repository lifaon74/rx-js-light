import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { createMulticastSource } from '../../../source/multicast-source/create-multicast-source';
import { ISourceSubscribePipeGetSource, sourceSubscribePipe } from './source-subscribe-pipe/source-subscribe-pipe';
import { IMulticastSource } from '../../../source/multicast-source/multicast-source.type';

// https://rxjs-dev.firebaseapp.com/guide/subject
// https://rxjs-dev.firebaseapp.com/api/operators/refCount
// https://rxjs-dev.firebaseapp.com/api/operators/share
// https://rxjs-dev.firebaseapp.com/api/operators/multicast
// https://rxjs-dev.firebaseapp.com/api/operators/publish

/*
share <=> multicast(() => new Subject()), refCount())
share <=> pipe(publish(), refCount())

 */

export interface IShareSubscribePipeGetMultiCastSource<GValue> extends ISourceSubscribePipeGetSource<GValue> {
  (): IMulticastSource<GValue>;
}

export function shareSubscribePipe<GValue>(
  createSource: IShareSubscribePipeGetMultiCastSource<GValue> = createMulticastSource,
): ISubscribePipeFunction<GValue, GValue> {
  return sourceSubscribePipe<GValue>(createSource);
}
