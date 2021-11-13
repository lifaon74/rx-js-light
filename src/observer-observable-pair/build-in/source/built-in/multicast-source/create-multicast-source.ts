import { freeze } from '../../../../../misc/helpers/freeze';
import { noop } from '../../../../../misc/helpers/noop';
import { IObservable, IUnsubscribe } from '../../../../../observable/type/observable.type';
import { IObserver } from '../../../../../observer/type/observer.type';
import { IMulticastSource } from './multicast-source.type';

export function createMulticastSource<GValue>(): IMulticastSource<GValue> {
  let _emitFunctions: IObserver<GValue>[] = [];
  let _dispatchingObservers: IObserver<GValue>[]; // what is dispatched
  let _dispatchingCount: number = 0; // number of dispatch remaining

  const cloneObservers = (): void => {
    if (_emitFunctions === _dispatchingObservers) {
      _emitFunctions = _emitFunctions.slice(); // clone _emitFunctions to avoid mutating _dispatchingObservers
    }
  };

  const emit: IObserver<GValue> = (value: GValue): void => {
    if (_dispatchingCount === 0) {
      // fix dispatching variables
      _dispatchingObservers = _emitFunctions; // copied as reference for faster execution time
      _dispatchingCount = _dispatchingObservers.length;
      // iterates until we have nothing more to dispatch
      for (let i = 0; _dispatchingCount > 0; i++) {
        _dispatchingCount--; // optimization
        _dispatchingObservers[i](value);
      }
    } else {
      throw new Error(`Already dispatching.`);
    }
  };

  const subscribe: IObservable<GValue> = (emit: IObserver<GValue>): IUnsubscribe => {
    let running: boolean = true;
    // if we are dispatching, we must clone _emitFunctions, to avoid changing _dispatchingObservers
    if (_dispatchingCount > 0) { // if we are dispatching
      cloneObservers();
    }
    _emitFunctions.push(emit);
    return (): void => {
      if (running) {
        running = false;
        if (_dispatchingCount > 0) { // if we are dispatching
          cloneObservers();
          _dispatchingObservers[_dispatchingObservers.indexOf(emit)] = noop; // remove from _dispatchingObservers the emit function
        }
        _emitFunctions.splice(_emitFunctions.indexOf(emit), 1);
      }
    };
  };

  return freeze({
    getObservers: (): readonly IObserver<GValue>[] => {
      return _emitFunctions;
    },
    emit,
    subscribe,
  });
}
