import { IObserver } from '../../../type/observer.type';
import { ITapFunction } from './tap-function.type';

export function tapObserver<GValue>(
  emit: IObserver<GValue>,
  tapFunction: ITapFunction<GValue>,
): IObserver<GValue> {
  return (value: GValue): void => {
    tapFunction(value);
    emit(value);
  };
}




