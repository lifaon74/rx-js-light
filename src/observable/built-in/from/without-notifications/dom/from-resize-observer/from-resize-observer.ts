import { createMulticastSource } from '../../../../../../observer-observable-pair/build-in/source/built-in/multicast-source/create-multicast-source';
import { IMulticastSource } from '../../../../../../observer-observable-pair/build-in/source/built-in/multicast-source/multicast-source.type';
import { freeze } from '../../../../../../misc/helpers/freeze';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

interface IResizeObserverAndSubscription {
  readonly subscribe: IObservable<ReadonlyArray<ResizeObserverEntry>>;
  readonly observer: ResizeObserver;
}

let RESIZE_OBSERVER_AND_SUBSCRIPTION_CACHED: IResizeObserverAndSubscription;

function getResizeObserverAndSubscription(): IResizeObserverAndSubscription {
  if (RESIZE_OBSERVER_AND_SUBSCRIPTION_CACHED === void 0) {
    const source: IMulticastSource<ReadonlyArray<ResizeObserverEntry>> = createMulticastSource<ReadonlyArray<ResizeObserverEntry>>();
    const observer: ResizeObserver = new ResizeObserver((entries: ReadonlyArray<ResizeObserverEntry>): void => {
      source.emit(entries);
    });
    RESIZE_OBSERVER_AND_SUBSCRIPTION_CACHED = freeze({
      subscribe: source.subscribe,
      observer,
    });
  }
  return RESIZE_OBSERVER_AND_SUBSCRIPTION_CACHED;
}

/*---*/

export function fromResizeObserver(
  element: Element,
  options?: ResizeObserverOptions,
): IObservable<ResizeObserverEntry> {
  return (emit: IObserver<ResizeObserverEntry>): IUnsubscribe => {
    let running: boolean = true;
    const { subscribe, observer } = getResizeObserverAndSubscription();
    const unsubscribe: IUnsubscribe = subscribe((entries: ReadonlyArray<ResizeObserverEntry>): void => {
      for (let i = 0, l = entries.length; i < l; i++) {
        const entry: ResizeObserverEntry = entries[i];
        if (running && (entry.target === element)) {
          emit(entry);
          break;
        }
      }
    });
    observer.observe(element, options);
    return (): void => {
      if (running) {
        running = false;
        unsubscribe();
        observer.unobserve(element);
      }
    };
  };
}


