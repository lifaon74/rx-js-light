import { IReplayLastSource } from './replay-last-source.type';
import { IObserver } from '../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../observable/type/observable.type';
import { ISource } from '../../type/source.type';
import { freeze } from '../../../../../misc/helpers/freeze';

export interface ICreateReplayLastSourceOptions<GValue> {
  initialValue?: GValue;
}

export function createReplayLastSource<GValue, GSource extends ISource<GValue>>(
  source: GSource,
  options?: ICreateReplayLastSourceOptions<GValue>,
): IReplayLastSource<GValue, GSource> {
  let currentValue: GValue;
  let initialized: boolean;

  if ((options === void 0) || !('initialValue' in options)) {
    initialized = false;
  } else {
    initialized = true;
    currentValue = options.initialValue as GValue;
  }

  const emit: IObserver<GValue> = (value: GValue): void => {
    initialized = true;
    currentValue = value;
    source.emit(value);
  };

  const subscribe: IObservable<GValue> = (emit: IObserver<GValue>): IUnsubscribe => {
    if (initialized) {
      emit(currentValue as GValue);
    }
    return source.subscribe(emit);
  };

  return freeze({
    ...source,
    getValue: (): GValue => {
      return currentValue as GValue;
    },
    emit,
    subscribe,
  });
}

