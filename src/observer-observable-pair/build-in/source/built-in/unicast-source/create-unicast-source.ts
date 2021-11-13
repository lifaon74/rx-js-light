import { IObserver } from '../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../observable/type/observable.type';
import { IUnicastSource } from './unicast-source.type';
import { freeze } from '../../../../../misc/helpers/freeze';

export function createUnicastSource<GValue>(): IUnicastSource<GValue> {
  let _emitFunction: IObserver<GValue> | null = null;

  const emit: IObserver<GValue> = (value: GValue): void => {
    if (_emitFunction !== null) {
      _emitFunction(value);
    }
  };

  const subscribe: IObservable<GValue> = (emit: IObserver<GValue>): IUnsubscribe => {
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

  return freeze({
    getObserver: (): IObserver<GValue> | null => {
      return _emitFunction;
    },
    emit,
    subscribe,
  });
}
