import { ITapFunction } from '../../../../../../observer/pipes/built-in/tap/tap-function.type';
import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { tapObservable } from './tap-observable';

export function tapObservablePipe<GValue>(
  tapFunction: ITapFunction<GValue>,
): IObservablePipe<GValue, GValue> {
  return (subscribe: IObservable<GValue>): IObservable<GValue> => {
    return tapObservable<GValue>(subscribe, tapFunction);
  };
}

