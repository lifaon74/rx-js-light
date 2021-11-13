import { IObserver } from '../../../type/observer.type';
import { IObserverPipe } from '../../type/observer-pipe.type';
import { ITapFunction } from './tap-function.type';
import { tapObserver } from './tap-observer';

export function tapObserverPipe<GValue>(
  tapFunction: ITapFunction<GValue>,
): IObserverPipe<GValue, GValue> {
  return (emit: IObserver<GValue>): IObserver<GValue> => {
    return tapObserver<GValue>(emit, tapFunction);
  };
}
