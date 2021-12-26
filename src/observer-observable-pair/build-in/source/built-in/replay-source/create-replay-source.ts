import { IReplaySource } from './replay-source.type';
import { IObserver } from '../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../observable/type/observable.type';
import { ISource } from '../../type/source.type';
import { freeze } from '../../../../../misc/helpers/freeze';

export function createReplaySource<GValue, GSource extends ISource<GValue>>(
  source: GSource,
  maxNumberOfValues: number = Number.POSITIVE_INFINITY,
): IReplaySource<GValue, GSource> {
  let values: GValue[] = [];


  const emit: IObserver<GValue> = (value: GValue): void => {
    values.push(value);
    if (values.length > maxNumberOfValues) {
      values.shift();
    }
    source.emit(value);
  };

  const subscribe: IObservable<GValue> = (emit: IObserver<GValue>): IUnsubscribe => {
    for (let i = 0; i < values.length; i++) {
      emit(values[i]);
    }
    return source.subscribe(emit);
  };

  return freeze({
    ...source,
    getValues: (): readonly GValue[] => {
      return values;
    },
    emit,
    subscribe,
  });
}

