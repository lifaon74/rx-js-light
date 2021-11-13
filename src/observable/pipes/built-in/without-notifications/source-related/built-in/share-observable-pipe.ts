import { createMulticastSource } from '../../../../../../observer-observable-pair/build-in/source/built-in/multicast-source/create-multicast-source';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { sourceObservablePipe } from '../source-observable-pipe';
import { IShareObservablePipeGetMultiCastSource } from './share-observable-pipe-get-multi-cast-source.type';

// https://rxjs-dev.firebaseapp.com/guide/subject
// https://rxjs-dev.firebaseapp.com/api/operators/refCount
// https://rxjs-dev.firebaseapp.com/api/operators/share
// https://rxjs-dev.firebaseapp.com/api/operators/multicast
// https://rxjs-dev.firebaseapp.com/api/operators/publish

/*
share <=> multicast(() => new Subject()), refCount())
share <=> pipe(publish(), refCount())

 */

export function shareObservablePipe<GValue>(
  getMulticastSource: IShareObservablePipeGetMultiCastSource<GValue> = createMulticastSource,
): IObservablePipe<GValue, GValue> {
  return sourceObservablePipe<GValue>(getMulticastSource);
}
