import { IMulticastSource } from '../../../../../../observer-observable-pair/build-in/source/built-in/multicast-source/multicast-source.type';
import { ISourceObservablePipeGetSource } from '../source-observable-pipe-get-source.type';

export interface IShareObservablePipeGetMultiCastSource<GValue> extends ISourceObservablePipeGetSource<GValue> {
  (): IMulticastSource<GValue>;
}
