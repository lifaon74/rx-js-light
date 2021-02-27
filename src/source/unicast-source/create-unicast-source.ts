import { IEmitFunction } from '../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { IUnicastSource } from './unicast-source.type';


export function createUnicastSource<GValue>(
): IUnicastSource<GValue> {
  let _emitFunction: IEmitFunction<GValue> | null = null;

  const emit: IEmitFunction<GValue> = (value: GValue): void => {
    if (_emitFunction !== null) {
      _emitFunction(value);
    }
  };

  const subscribe: ISubscribeFunction<GValue> = (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    if (_emitFunction === null) {
      let running: boolean = true;
      _emitFunction = emit;
      return (): void => {
        if (running) {
          running = false;
          _emitFunction = null;
        }
      };
    } else {
      throw new Error(`Max one observer allowed`);
    }
  };

  return Object.freeze({
    getObserver: (): IEmitFunction<GValue> | null => {
      return _emitFunction;
    },
    emit,
    subscribe,
  });
}
