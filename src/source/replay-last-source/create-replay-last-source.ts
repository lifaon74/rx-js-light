import { IReplayLastSource } from './replay-last-source.type';
import { IEmitFunction } from '../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { ISource } from '../source.type';

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

  const emit: IEmitFunction<GValue> = (value: GValue) => {
    initialized = true;
    currentValue = value;
    source.emit(value);
  };

  const subscribe: ISubscribeFunction<GValue> = (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    if (initialized) {
      emit(currentValue as GValue);
    }
    return source.subscribe(emit);
  };

  return Object.freeze({
    ...source,
    getValue: (): GValue => {
      return currentValue as GValue;
    },
    emit,
    subscribe,
  });
}

