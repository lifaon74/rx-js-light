import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../../../types';
import { createMulticastSource } from '../../../../source/multicast-source/create-multicast-source';
import { IMulticastSource } from '../../../../source/multicast-source/multicast-source.type';


interface IResizeObserverAndSubscription {
  readonly subscribe: ISubscribeFunction<ReadonlyArray<ResizeObserverEntry>>;
  readonly observer: ResizeObserver;
}

let RESIZE_OBSERVER_AND_SUBSCRIPTION_CACHED: IResizeObserverAndSubscription;

export function getResizeObserverAndSubscription(): IResizeObserverAndSubscription {
  if (RESIZE_OBSERVER_AND_SUBSCRIPTION_CACHED === void 0) {
    const source: IMulticastSource<ReadonlyArray<ResizeObserverEntry>> = createMulticastSource<ReadonlyArray<ResizeObserverEntry>>(true);
    const observer: ResizeObserver = new ResizeObserver((entries: ReadonlyArray<ResizeObserverEntry>) => {
      source.emit(entries);
    });
    RESIZE_OBSERVER_AND_SUBSCRIPTION_CACHED = Object.freeze({
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
): ISubscribeFunction<ResizeObserverEntry> {
  return (emit: IEmitFunction<ResizeObserverEntry>): IUnsubscribeFunction => {
    let running: boolean = true;
    const { subscribe, observer } = getResizeObserverAndSubscription();
    const unsubscribe: IUnsubscribeFunction = subscribe((entries: ReadonlyArray<ResizeObserverEntry>) => {
      for (let i = 0, l = entries.length; i < l; i++) {
        const entry: ResizeObserverEntry = entries[i];
        if (running && (entry.target === element)) {
          emit(entry);
          break;
        }
      }
    })
    observer.observe(element, options);
    return () => {
      if (running) {
        running = false;
        unsubscribe();
        observer.unobserve(element);
      }
    };
  };
}


